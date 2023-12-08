import * as Yup from "yup";

export const validationSchemaUser = Yup.object().shape({
    username: Yup.string()
    .required('El username es requerido')
    .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'El username debe ser una dirección de correo electrónico válida'
    ),
    name: Yup.string().required('El nombre es requerido'),
    lastname: Yup.string().required('El apellido es requerido'),
    password: Yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
});