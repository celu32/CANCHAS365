import { Button, Container, FormControlLabel, MenuItem, Checkbox, Switch, TextField, Box} from "@mui/material";
import { useFormik } from "formik";
import { validationSchemaForm as validationSchema } from "../../../validations/ValidationSchemaAdmin";
import styles from './styles.module.css';
import Swal from 'sweetalert2';
import { ENDPOINTS } from '../../../constants/endpoints';
import useFetchApi from '../../../hooks/useFetchApi';
import useFetchDataImages from "../../../hooks/useFetchDataImages";
import { METHODS } from "../../../constants/methods";
import Loading from "../../loading/Loading";
import { useState } from "react";
import axios from 'axios'
import ListImages from "./ListImages";




const FormAdmin = ({action, club, handleUpdate}) => {

    const { data: categories, isLoading: isLoadingCategories } = useFetchApi(`${ENDPOINTS.CATEGORY}`);
    
    const { data: characteristics, isLoading: isLoadingCharacteristics} = useFetchApi(`${ENDPOINTS.CHARACTERISTIC}`);

    const { data: cities, isLoading: isLoadingCities } = useFetchApi(`${ENDPOINTS.CITY}`);

    const { isLoading, fetchData } = useFetchDataImages();

    const [images, setImages] = useState([])

    const initialValues = action === 'MODIFICAR CLUB' ? {
        id:club.id,
        name: club.name, 
        phone_number: club.phone_number, 
        recommended: club.recommended,
        address: {
            street: club.address.street,
            number: club.address.number,
            floor: club.address.floor,
            apartment: club.address.apartment,
            city: {
                id: club.address.city.id
            }
        },
        category: { id: club.category.id }, 
        characteristics: club.characteristics.map(char => ({ id: char.id })), 
        images: club.images
    } : {
        name: '', 
        phone_number: '', 
        recommended: false,
        address: {
            street: '',
            number: '',
            floor: '',
            apartment: '',
            city: {
                id: '',
            }, 
        },
        category: { id: '' }, 
        characteristics: [], 
        images: []
    };


    const labels = action === 'MODIFICAR CLUB' ? {
        name: club.name, 
        phone_number: club.phone_number, 
        street: club.address.street,
        number: club.address.number,
        floor: club.address.floor,
        apartment: club.address.apartment,
        city: club.address.city.name,
        category: club.category.title
        
    } : {
        name: 'Nombre', 
        phone_number: 'Teléfono' , 
        street: 'Calle',
        number: 'Número',
        floor: 'Piso',
        apartment: 'Departamento',
        city: 'Ciudad',
        category: 'Categoría'

    };


    const isComplete = (values) => {
        if (
            values.name != '' &&
            values.category.id != '' &&
            values.phone_number != '' &&
            values.address.street != '' &&
            values.address.number != '' &&
            values.address.city.id != ''
        ){
            return true 
        }
        else{
            return false
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema
    });


    const handleCheckboxChange = (event) => {
        const charId = parseInt(event.target.name);
        const isChecked = event.target.checked;
    
        if (isChecked) {
            formik.setValues(prevValues => ({
                ...prevValues,
                characteristics: [...prevValues.characteristics, { id: charId }],
            }));
        } else {
            formik.setValues(prevValues => ({
                ...prevValues,
                characteristics: prevValues.characteristics.filter(char => char.id !== charId),
            }));
        }
    };

    const handleFilesChange = async (event) => {
       const image = event.target.files[0];
       setImages((images)=>[...images, image])
    }

    const upload = async (idClub, file) => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            await axios.post(`${import.meta.env.VITE_BACKEND_API}image/${idClub}/upload`, formData, {headers: {
                "Content-Type": "multipart/form-data"
            }});
        } catch (error) {
           console.error("Error uploading image:", error)
        }
    }  

    const uploadImages =  ( idClub , images) => {
        images.forEach(image => {
                upload(idClub, image)
            }
        );
 
    }
    
    const submitFormCreate = async (values) => {

        const resp = await fetchData(ENDPOINTS.CLUB, METHODS.POST, values)

                if (resp.error){
                    Swal.fire({
                        title: resp.error,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    }).then(() => {
                       console.log(resp.error)
                    }
                    )
                }
                else{
                    Swal.fire({
                        title: 'Club agregado con éxito',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                    }).then(() => {
                       console.log("Club agregado con éxito")
                    }).then(() => {
                        uploadImages(resp.id , images)
                    })  
                } 
        
        handleUpdate(0, {}, 'AGREGAR CLUB')
    }

    const submitFormUpdate = async (values) => {

        const resp = await fetchData(ENDPOINTS.CLUB, METHODS.PUT, values)

                if (resp.error){
                    Swal.fire({
                        title: resp.error,
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                    }).then(() => {
                       console.log(resp.error)
                    }
                    )
                }
                else{
                    Swal.fire({
                        title: 'Club modificado con éxito',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                    }).then(() => {
                       console.log("Club modificado con éxito")
                    }).then(() => {
                        uploadImages(resp.id , images)
                    })   
                } 

        handleUpdate(0, {}, 'AGREGAR CLUB')
    }

    return (
        
        <Container maxWidth="md">

        {(isLoading || isLoadingCategories || isLoadingCities || isLoadingCharacteristics) ? <Loading /> :
            
            <form onSubmit={(e) => { 
                e.preventDefault();
                if(action == 'AGREGAR CLUB' && isComplete(formik.values)){
                    submitFormCreate(formik.values)
                }
                else if (action == 'MODIFICAR CLUB'){
                    submitFormUpdate(formik.values)
                }
                else{
                    Swal.fire({
                        title: 'Tenés que completar todos los campos del formulario',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                    }) 
                }
            }}  className={`${styles.form}` }>
           
                {
                    formik.touched.name && formik.errors.name && (
                        <span style={{ color: 'red' }}>{formik.errors.name}</span>
                    )
                }
                <TextField variant="outlined" size="small" label= {labels.name} type="text" name="name" className="input-background"
                    value={formik.values.name}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />


                {
                    formik.touched.category && formik.errors.category && (
                        <span style={{ color: 'red' }}>{formik.errors.category?.id}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.category} select name="category.id" className="input-background" 
                    value={formik.values.category?.id}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.title}
                        </MenuItem>
                    ))}
                </TextField>


                {
                    formik.touched.phone_number && formik.errors.phone_number && (
                        <span style={{ color: 'red' }}>{formik.errors.phone_number}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.phone_number} type="text" name="phone_number" className="input-background"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                
              
                {
                    formik.touched.address?.street && formik.errors.address?.street && (
                        <span style={{ color: 'red' }}>{formik.errors.address?.street}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.street} type="text" name="address.street" className="input-background" 
                    value={formik.values.address?.street}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                

                {
                    formik.touched.address?.number && formik.errors.address?.number && (
                        <span style={{ color: 'red' }}>{formik.errors.address?.number}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.number} type="number" name="address.number" className="input-background" 
                    value={formik.values.address?.number}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                
                <TextField variant="outlined" size="small" label={labels.floor} type="number" name="address.floor" className="input-background" 
                    value={formik.values.address?.floor}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                

                <TextField variant="outlined" size="small" label={labels.apartment} type="text" name="address.apartment" className="input-background" 
                    value={formik.values.address?.apartment}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                

                {
                    formik.touched.address?.city && formik.errors.address?.city && (
                        <span style={{ color: 'red' }}>{formik.errors.address?.city?.id}</span>
                    )
                }
                 <TextField variant="outlined" size="small" label={labels.city} select name="address.city.id" className="input-background" 
                    value={formik.values.address?.city?.id}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    {cities?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                            {city.name}
                        </MenuItem>
                    ))}
                </TextField>


                {
                    formik.touched.recommended && formik.errors.recommended && (
                        <span style={{ color: 'red' }}>{formik.errors.recommended}</span>
                    )
                }
                    <FormControlLabel labelPlacement="start" label="Recomendado" control={<Switch label="Recomandado" name="recommended" className="input-background"
                        checked={formik.values.recommended}
                        onChange={formik.handleChange} onBlur={formik.handleBlur} />}
                    />
                    
                <Box sx={{
                    display: 'flex', 
                    gap: '10px',
                    flexWrap:'wrap',
                    justifyContent: 'space-between'
                }} >
                {
                    characteristics?.map((characteristic) => (
                        <FormControlLabel
                            key={characteristic.name}
                            control={
                                <Checkbox
                                    name={characteristic.id}
                                    checked={formik.values.characteristics.some(char => char.id === characteristic.id)}
                                    onChange={handleCheckboxChange}
                                    value={formik.values.characteristic?.id}
                                    onBlur={formik.handleBlur}
                                />
                            }
                            label={characteristic?.name}
                            sx={{width:'200px', textAlign:'left'}}
                        />
                    ))
                }
                </Box>

                { <TextField variant="outlined" size="small" type="file" inputProps={{ multiple: true }} onChange={handleFilesChange} name="files" /> }

                <ListImages images={images} setImages={setImages}/>

                <Button variant="contained" type="submit">{action}</Button>
    
            </form>
        }
        </Container>
    )
}

export default FormAdmin