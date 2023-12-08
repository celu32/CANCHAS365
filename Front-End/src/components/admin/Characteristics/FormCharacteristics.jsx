import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import { validationSchemaForm as validationSchema } from "../../../validations/ValidationSchemaAdmin";
import styles from './styles.module.css';
import Swal from 'sweetalert2';
import { ENDPOINTS } from '../../../constants/endpoints';
import useFetchDataApi from "../../../hooks/useFetchDataApi";
import { METHODS } from "../../../constants/methods";
import Loading from "../../loading/Loading";


const FormCharacteristics = ({action, characteristic, handleUpdate}) => {
   
    const { data, isLoading, error, fetchData } = useFetchDataApi();

    const initialValues = action == 'MODIFICAR CARACTERÍSTICA' ? {
        id:characteristic.id,
        name:characteristic.name,
        url: characteristic.url
        }: {
            id: '', 
            name:'',
            url:'' 
        }
    
    const labels = action == 'MODIFICAR CARACTERÍSTICA' ?{
        name:characteristic.name,
        url: characteristic.url
        }: {
            name:'CARACTERÍSTICA',
            url:'ICONO'
        }
            
   

    const isComplete = (values) => {
        if (
            values.name != '' &&
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

        await fetchData(ENDPOINTS.CHARACTERISTIC, METHODS.POST, values)

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
                title: 'Característica agregada con éxito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
                console.log("La Solicitud Post se envió correctamente")
            }) 
        }
        
        handleUpdate(0, {}, 'AGREGAR CARACTERÍSTICA')
    }

    
    const submitFormUpdate = async (characteristic) => {

        await fetchData(ENDPOINTS.CHARACTERISTIC, METHODS.PUT, characteristic)

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
                title: 'Característica modificada con éxito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
                console.log("La Solicitud Post se envió correctamente")
            })                 
        }

        handleUpdate(0, {}, 'AGREGAR CARACTERÍSTICA')
    }

    return (
        
        <Container maxWidth="md">

        {(isLoading) ? <Loading /> :
            
            <form onSubmit={(e) => { 
                e.preventDefault();
                if(action == 'AGREGAR CARACTERÍSTICA' && isComplete(formik.values)){
                    submitFormCreate(formik.values)
                }
                else if (action == 'MODIFICAR CARACTERÍSTICA'){
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
                    formik.touched.description && formik.errors.description && (
                        <span style={{ color: 'red' }}>{formik.errors.description}</span>
                    )
                }
                <TextField variant="outlined" size="small" label={labels.name} type="text" name="name" className="input-background"
                    value={formik.values.name}
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

export default FormCharacteristics
