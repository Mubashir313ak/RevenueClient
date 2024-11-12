import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import Iconify from 'src/components/iconify';

function RevenueExpenseForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      revenueStreams: [{ name: '', percentage: '', id: '' }],
      expenses: [{ name: '', percentage: '', id: '' }],
      salary: '',
      rent: '',
    },
  });

  const {
    fields: revenueFields,
    append: addRevenue,
    remove: removeRevenue,
  } = useFieldArray({
    control,
    name: 'revenueStreams',
  });

  const {
    fields: expenseFields,
    append: addExpense,
    remove: removeExpense,
  } = useFieldArray({
    control,
    name: 'expenses',
  });

  const onSubmit = (data) => {
    console.log({ ...data, selectedDate });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h4">Revenue Details</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: 4,
            border: '2px solid',
            borderColor: '#007867',
            borderRadius: 1,
            p: 0.2,
          }}
        >
          <Iconify icon="lsicon:calendar-outline" width={34} sx={{ pt: 0.5, color: 'red' }} />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM, yyyy"
            showMonthYearPicker
            isClearable
            placeholderText="Select a month/year"
            className="custom-datepicker"
          />
        </Box>
      </Box>

      {/* Revenue Card */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Revenue
          </Typography>
          {revenueFields.map((field, index) => (
            <Grid container spacing={4} key={field.id} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.name`)}
                  label="Stream name"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.name}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.id`)}
                  label="Id"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.percentage}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.percentage`)}
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.percentage}
                />
              </Grid>
              <Grid item xs={2}>
                <Iconify
                  icon="fluent:delete-24-regular"
                  fullWidth
                  onClick={() => removeRevenue(index)}
                  sx={{ flexShrink: 0, ml: 0.5, color: 'red' }}
                />
              </Grid>
            </Grid>
          ))}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addRevenue({ name: '', percentage: '' })}
            startIcon={<Iconify icon="mingcute:add-fill" />}
            sx={{ ml: 2, mb: 1 }}
          >
            Add New
          </Button>
        </CardActions>
      </Card>

      {/* Expense Card */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Expense
          </Typography>
          {expenseFields.map((field, index) => (
            <Grid container spacing={4} key={field.id} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.name`)}
                  label="Vendor name"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.name}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.id`)}
                  label="Id"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.name}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.percentage`)}
                  label="Percentage"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.percentage}
                />
              </Grid>
              <Grid item xs={2}>
                <Iconify
                  icon="fluent:delete-24-regular"
                  fullWidth
                  onClick={() => removeExpense(index)}
                  sx={{ flexShrink: 0, ml: 0.5, color: 'red' }}
                />
              </Grid>
            </Grid>
          ))}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addExpense({ name: '', percentage: '' })}
            startIcon={<Iconify icon="mingcute:add-fill" />}
            sx={{ ml: 2, mb: 1 }}
          >
            Add New Expense
          </Button>
        </CardActions>
      </Card>
      {/* Rent Card */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Rent
          </Typography>

          <Grid item xs={5}>
            <TextField {...register('rent')} label="Rent" variant="outlined" fullWidth />
          </Grid>
        </CardContent>
      </Card>
      {/* Salary Card */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Salary
          </Typography>

          <Grid item xs={5}>
            <TextField {...register('salary')} label="Salaries" variant="outlined" fullWidth />
          </Grid>
        </CardContent>
      </Card>
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ mt: 4, ml: 'auto', display: 'flex', justifyContent: 'flex-end' }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default RevenueExpenseForm;
