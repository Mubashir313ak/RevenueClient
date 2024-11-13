import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import { LoadingButton } from '@mui/lab';
import Iconify from 'src/components/iconify';
import { CreateRevenueExpenseApi } from 'src/api/submission';
import { validationSchema } from 'src/utils/field-validation-schemas';

function RevenueExpenseForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      revenueStreams: [{ name: '', id: '', value: 0 }],
      expenses: [{ name: '', id: '', value: 0 }],
      salary: 0,
      rent: 0,
      selectedDate: null,
    },
  });
  console.log('Validation Errors:', errors);
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

  const onSubmit = async (data) => {
    console.log('Form Submitted:', data); // Check if this is logged
    const formattedData = {
      ...data,
      selectedDate: selectedDate?.toISOString().split('T')[0], // Format date to YYYY-MM-DD
    };

    try {
      const response = await CreateRevenueExpenseApi(formattedData);
      console.log('Submission success:', response);
    } catch (error) {
      console.error('Submission error:', error);
    }
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
          <Controller
            control={control}
            name="selectedDate"
            defaultValue={selectedDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={selectedDate}
                onChange={(date) => {
                  field.onChange(date);
                  setSelectedDate(date);
                }}
                dateFormat="MMMM, yyyy"
                showMonthYearPicker
                isClearable
                placeholderText="Select a month/year"
                className="custom-datepicker"
              />
            )}
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
                  error={!!errors?.revenueStreams?.[index]?.name}
                  helperText={errors?.revenueStreams?.[index]?.name?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.id`)}
                  label="Id"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.revenueStreams?.[index]?.id}
                  helperText={errors?.revenueStreams?.[index]?.id?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.value`)}
                  label="Value"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.revenueStreams?.[index]?.value}
                  helperText={errors?.revenueStreams?.[index]?.value?.message}
                />
              </Grid>
              <Grid item xs={2}>
                <Iconify
                  icon="fluent:delete-24-regular"
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
            onClick={() => addRevenue({ name: '', id: '', value: '' })}
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
                  label="Expense name"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.expenses?.[index]?.name}
                  helperText={errors?.expenses?.[index]?.name?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.id`)}
                  label="Id"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.expenses?.[index]?.id}
                  helperText={errors?.expenses?.[index]?.id?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.value`)}
                  label="Value"
                  variant="outlined"
                  fullWidth
                  error={!!errors?.expenses?.[index]?.value}
                  helperText={errors?.expenses?.[index]?.value?.message}
                />
              </Grid>
              <Grid item xs={2}>
                <Iconify
                  icon="fluent:delete-24-regular"
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
            onClick={() => addExpense({ name: '', id: '', value: '' })}
            startIcon={<Iconify icon="mingcute:add-fill" />}
            sx={{ ml: 2, mb: 1 }}
          >
            Add New Expense
          </Button>
        </CardActions>
      </Card>

      {/* Rent and Salary Fields */}
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Other Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                {...register('salary')}
                label="Salary"
                variant="outlined"
                fullWidth
                error={!!errors.salary}
                helperText={errors.salary?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register('rent')}
                label="Rent"
                variant="outlined"
                fullWidth
                error={!!errors.rent}
                helperText={errors.rent?.message}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <LoadingButton type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </LoadingButton>
    </Box>
  );
}

export default RevenueExpenseForm;
