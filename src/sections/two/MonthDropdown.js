import React, { useState } from 'react';
import { TextField, Menu, MenuItem, Button, Box } from '@mui/material';

function MonthPicker() {
  const [anchorEl, setAnchorEl] = useState(null); // To control the open/close state of the Menu
  const [selectedMonth, setSelectedMonth] = useState(''); // To store the selected month
  const [open, setOpen] = useState(false); // To manage dropdown visibility

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Handle opening the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the dropdown
    setOpen(true);
  };

  // Handle selecting a month
  const handleSelectMonth = (month) => {
    setSelectedMonth(month); // Set the selected month
    setOpen(false); // Close the dropdown
  };

  // Handle closing the dropdown without selecting a month
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: 250, margin: 'auto', paddingTop: 4 }}>
      {/* TextField to display the selected month */}
      <TextField
        value={selectedMonth}
        label="Select Month"
        variant="outlined"
        fullWidth
        onClick={handleClick}
        InputProps={{
          readOnly: true,
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {months.map((month, index) => (
          <MenuItem key={index} onClick={() => handleSelectMonth(month)}>
            {month}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MonthPicker;
