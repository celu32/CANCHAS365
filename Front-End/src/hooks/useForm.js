import { useState } from "react"

export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);

    const handleChange = event => {
        const { name, value } = event;
        setValues({
            ...values,
            [name]: value
        });
    }

    const resetForm = () => {
        setValues(initialState)
    }

    return {
        values,
        handleChange,
        resetForm
    }
}
