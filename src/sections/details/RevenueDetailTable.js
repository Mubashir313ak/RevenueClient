import PropTypes from 'prop-types';

import {
  Button,
  Card,
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

const RevenueDetailTable = ({ data }) => {
  console.log('data', data);

  const [revenueForecasts, setRevenueForecasts] = useState([]);
  const [expenseForecasts, setExpenseForecasts] = useState([]);
  const [salaryForecast, setSalaryForecast] = useState(0);
  const [rentForecast, setRentForecast] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [reportingPeriod, setReportingPeriod] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const forecastData = {
      revenueForecasts,
      expenseForecasts,
      salaryForecast,
      rentForecast,
      selectedDate,
    };

    try {
      const response = await updateForecast(forecastData);
      console.log('Forecast updated successfully:', response);
    } catch (error) {
      console.error('Failed to update forecast:', error);
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
                  <TableCell>0</TableCell>

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
                  <TableCell>0</TableCell>
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
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}
      >
        Submit
      </Button>
    </>
  );
};
RevenueDetailTable.propTypes = {
  data: PropTypes.object,
};
export default RevenueDetailTable;
