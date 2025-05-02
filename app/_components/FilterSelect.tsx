import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterSelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, value, onChange }) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl sx={{width: '10.5rem', marginRight: '77.5%'}}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} value={value} onChange={handleChange}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        PaperProps: {
                            sx: {
                                maxWidth: '5rem',
                                maxHeight: '21rem',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                            },
                        },
                        MenuListProps: {
                            sx: {
                                display: 'flex',
                                flexDirection: 'column',
                            },
                        },
                    }}

            >
                <MenuItem value="" sx={{ justifyContent: 'flex-end', paddingLeft: '1rem' }}>
                    All
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option} sx={{ justifyContent: 'flex-end' }}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterSelect;
