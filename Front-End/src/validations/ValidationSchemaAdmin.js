import * as Yup from "yup";

const citySchema = Yup.object().shape({
    id: Yup.string().required('Dato obligatorio'),
});

const categorySchema = Yup.object().shape({
    id: Yup.string().required('Dato obligatorio'),
});


const addressSchema = Yup.object().shape({
    street: Yup.string().required('Dato obligatorio'),
    number: Yup.string().required('Dato obligatorio'),
    floor: Yup.string().required('Dato obligatorio'),
    apartment: Yup.string().required('Dato obligatorio'),
    city: citySchema
});

export const validationSchemaForm = Yup.object().shape({
    name: Yup.string().required('Dato obligatorio'),
    category: categorySchema,
    phone_number: Yup.string().required('Dato obligatorio'),
    recommended: Yup.boolean(),
    address: addressSchema,
    description: Yup.string().required('Dato obligatorio'),
});

