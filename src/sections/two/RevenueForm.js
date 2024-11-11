import React from 'react';
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
import Iconify from 'src/components/iconify';

function RevenueExpenseForm() {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      revenueStreams: [{ name: '', percentage: '' }],
      expenses: [{ name: '', percentage: '' }],
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
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 4, width: '100%', mx: 'auto' }}
    >
      {/* Revenue Card */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Revenue
          </Typography>
          {revenueFields.map((field, index) => (
            <Grid container spacing={4} key={field.id} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.name`)}
                  label="Stream name"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.name}
                  sx={{ pt: 2 }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`revenueStreams.${index}.percentage`)}
                  label="Percentage"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.percentage}
                  sx={{ pt: 2 }}
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
            <Grid container spacing={4} key={field.id} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.name`)}
                  label="Vendor name"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.name}
                  sx={{ pt: 2 }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register(`expenses.${index}.percentage`)}
                  label="Percentage"
                  variant="outlined"
                  fullWidth
                  defaultValue={field.percentage}
                  sx={{ pt: 2 }}
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
            onClick={() => addExpense({ name: '', percentage: '' })}
            startIcon={<Iconify icon="mingcute:add-fill" />}
          >
            Add New Expense
          </Button>
        </CardActions>
      </Card>

      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default RevenueExpenseForm;
