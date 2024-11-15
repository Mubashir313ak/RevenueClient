import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { updateForecast } from 'src/api/submission';

const RevenueDetailTable = ({ data, selectedDate }) => {
  console.log('data', data);
  const adjustedDate = new Date(selectedDate);
  adjustedDate.setMonth(adjustedDate.getMonth() + 1); // Adjust the month by 1
  const formattedDate = adjustedDate.toISOString().split('T')[0];
  const [revenueForecasts, setRevenueForecasts] = useState([]);
  const [expenseForecasts, setExpenseForecasts] = useState([]);
  const [salaryForecast, setSalaryForecast] = useState(0);
  const [rentForecast, setRentForecast] = useState(0);
  const [reportingPeriod, setReportingPeriod] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const forecastData = {
      revenueForecasts,
      expenseForecasts,
      salaryForecast,
      rentForecast,
      selectedDate: formattedDate,
    };

    try {
      const response = await updateForecast(forecastData);
      console.log('Forecast updated successfully:', response);
    } catch (errorr) {
      console.error('Failed to update forecast:', errorr);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Revenue</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Revenue</TableCell>

                <TableCell>Difference From Prior Period</TableCell>
                <TableCell>Difference from Forecast</TableCell>
                <TableCell>Forecast Next Reporting Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.revenue?.map((i) => (
                <TableRow>
                  <TableCell>{i?.name ? i?.name : ''}</TableCell>
                  <TableCell>{i?.value ? i?.value : '0'}</TableCell>
                  <TableCell>{i?.forecast ? i?.forecast : '0'}</TableCell>

                  <TableCell>
                    <TextField
                      value={revenueForecasts}
                      onChange={(e) => setRevenueForecasts(e.target.value)}
                      label="name"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Expense</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>

                <TableCell>Difference From Prior Period</TableCell>
                <TableCell>Difference from Forecast</TableCell>
                <TableCell>Forecast Next Reporting Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.expense?.map((i) => (
                <TableRow>
                  <TableCell>{i?.name}</TableCell>
                  <TableCell>{i?.value}</TableCell>
                  <TableCell>{i?.forecast ? i?.forecast : '0'}</TableCell>
                  <TableCell>
                    <TextField
                      label="Forecast"
                      value={expenseForecasts}
                      onChange={(e) => setExpenseForecasts(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Salary and Rent</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>

                <TableCell>Difference From Prior Period</TableCell>
                <TableCell>Difference from Forecast</TableCell>
                <TableCell>Forecast Next Reporting Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Salary</TableCell>
                <TableCell>{data?.salary}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <TextField
                    label="Forecast"
                    value={salaryForecast}
                    onChange={(e) => setSalaryForecast(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rent</TableCell>
                <TableCell>{data?.rent}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <TextField
                    label="Forecast"
                    value={rentForecast}
                    onChange={(e) => setRentForecast(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </>
  );
};
RevenueDetailTable.propTypes = {
  data: PropTypes.object,
  selectedDate: PropTypes.object,
};
export default RevenueDetailTable;
