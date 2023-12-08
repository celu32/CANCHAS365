import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SelectInput = ({ options, handleChange, name }) => {

    const [value, setValue] = useState(null);
    const newOptions = options?.map((item) => ({
        ...item,
        name: item.title || item.name,
        title: undefined
    }))

    return (
        <> {
            options && (<Autocomplete
                disablePortal
                id="searchBox"
                options={newOptions}
                getOptionLabel={(option) => (option && typeof option.name === 'string' ? option.name : '')}
                sx={{
                    width: 200,
                    color: '#FF914D',
                }}
                value={value}
                onChange={(_, selectValue) => {
                    setValue(selectValue);
                    handleChange({ name, value: selectValue });
                }}
                renderInput={(params) => <TextField {...params} label={name === 'city' ? 'Ciudad' : 'Deportes'} />}
            />)
        }
        </>
    );
};

export default SelectInput;