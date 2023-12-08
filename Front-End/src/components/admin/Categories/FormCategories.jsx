import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import { validationSchemaForm as validationSchema } from "../../../validations/ValidationSchemaAdmin";
import styles from './styles.module.css';
import Swal from 'sweetalert2';
import { ENDPOINTS } from '../../../constants/endpoints';

import useFetchDataApi from "../../../hooks/useFetchDataApi";
import { METHODS } from "../../../constants/methods";
import Loading from "../../loading/Loading";


const FormCategory = ({action, category, handleUpdate}) => {
   
    const { data, isLoading, error, fetchData } = useFetchDataApi();

    const initialValues = action == 'MODIFICAR CATEGORÍA' ? {
        id:category.id,
        title:category.title,
        description:category.description, 
        url: category.url
        }: {
            id: '', 
            title:'',
            description:'' , 
            url:'' 
        }
    
    const labels = action == 'MODIFICAR CATEGORÍA' ?{
        title:category.title,
        description:category.description, 
        url: category.url
        }: {
            title:'TÍTULO',
            description:'DESCRIPCIÓN' , 
            url:'URL FOTO'
        }
            
   

    const isComplete = (values) => {
        if (
            values.title != '' &&
            values.description != '' &&
            values.url != '' 
        ){
            return true 
        }
        else{
            return false
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
    });

    const submitFormCreate = async (values) => {

        await fetchData(ENDPOINTS.CATEGORY, METHODS.POST, values)

        if (error) {
            Swal.fire({
                title: error,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
                console.log(error)
            })

        } else {
            Swal.fire({
                title: 'Categoría agregada con éxito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
                console.log("La Solicitud Post se envio correctamente")
            }) 
        }
        
        handleUpdate(0, {}, 'AGREGAR CATEGORÍA')
    }

    
    const submitFormUpdate = async (category) => {

        await fetchData(ENDPOINTS.CATEGORY, METHODS.PUT, category)

        if (error) {
            Swal.fire({
                title: error,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
                console.log(error)
            })

        } else {
            Swal.fire({
                title: 'Categoría modificada con éxito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
                console.log("La Solicitud Post se envio correctamente")
            })                 
        }

        handleUpdate(0, {}, 'AGREGAR CATEGORÍA')
    }

    return (
        
        <Container maxWidth="md">

        {(isLoading) ? <Loading /> :
            
            <form onSubmit={(e) => { 
                e.preventDefault();
                if(action == 'AGREGAR CATEGORÍA' && isComplete(formik.values)){
                    submitFormCreate(formik.values)
                }
                else if (action == 'MODIFICAR CATEGORÍA'){
                    submitFormUpdate(formik.values)
                }
                else{
                    Swal.fire({
                        title: 'Tenes que completar todos los campos del formulario',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                    }) 
                }
            }}  className={`${styles.form}` }>
           
                {
                    formik.touched.description && formik.errors.description && (
                        <span style={{ color: 'red' }}>{formik.errors.description}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.title} type="text" name="title" className="input-background"
                    value={formik.values.title}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    
                {
                    formik.touched.description && formik.errors.description && (
                        <span style={{ color: 'red' }}>{formik.errors.description}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.description} type="text" name="description" className="input-background"
                    value={formik.values.description}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />

                {
                    formik.touched.description && formik.errors.description && (
                        <span style={{ color: 'red' }}>{formik.errors.description}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.url} type="text" name="url" className="input-background"
                    value={formik.values.url}
                    onChange={formik.handleChange} onBlur={formik.handleBlur} />

                <Button variant="contained" type="submit">{action}</Button>
               
            </form>
        }   
        </Container>
    )
}

export default FormCategory
