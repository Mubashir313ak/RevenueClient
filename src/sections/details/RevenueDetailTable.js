import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

const RevenueDetailTable = () => {
  const [priorPeriod, setPriorPeriod] = useState('');
  const [forecast, setForecast] = useState('');
  const [reportingPeriod, setReportingPeriod] = useState('');
  return (
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
          {[1, 2, 3].map((i) => (
            <TableRow>
              <TableCell>{`Stream ${i}`}</TableCell>
              <TableCell>aplle</TableCell>
              <TableCell>aplle</TableCell>

              <TableCell>
                <TextField label="name" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RevenueDetailTable;
