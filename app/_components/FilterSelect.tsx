import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterSelectProps {
    label: string;
    options: string[];
    value: string | '';
    onChange: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, value, onChange }) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={value}
                onChange={handleChange}
            >
                <MenuItem value="">All</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterSelect;
