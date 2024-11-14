import PropTypes from 'prop-types';

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

const SalaryAndRentDetails = ({ data }) => {
  console.log(('Datdaada', data));

  const [priorPeriod, setPriorPeriod] = useState('');
  const [forecast, setForecast] = useState('');
  const [reportingPeriod, setReportingPeriod] = useState('');
  return (
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
            <TableCell>{data}</TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>
              <TextField
                label="Forecast"
                value={reportingPeriod}
                onChange={(e) => setReportingPeriod(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rent</TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>Apple</TableCell>
            <TableCell>
              <TextField
                label="Forecast"
                value={reportingPeriod}
                onChange={(e) => setReportingPeriod(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
SalaryAndRentDetails.propTypes = {
  data: PropTypes.object,
};
export default SalaryAndRentDetails;
