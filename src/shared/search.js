import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

const Search = ({ filters, onFilterChange }) => {

    const handleChange = (event) => {
        const searchValue = event.target.value;
        Object.keys(filters).forEach((key) => (
            onFilterChange(key, searchValue)
        ));
    };

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 250,
                '@media (max-width: 600px)': {
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '2px 4px',
                },
            }}
        >
            <SearchIcon sx={{ p: '10px', color: "#7F8085" }} />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by Name or Email"
                onChange={handleChange}
                value={filters.name}
            />
        </Paper>
    );
};

export default Search;