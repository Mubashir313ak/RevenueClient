// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
// components
import { Button, Card } from '@mui/material';
import { useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import RevenueDetailTable from './RevenueDetailTable';
import ExpenseDetailTable from './ExpenseDetailTable';
import SalaryAndRentDetails from './SalaryAndRentDetails';
import '../revenue/style.css';
// ----------------------------------------------------------------------

export default function Detail() {
  const settings = useSettingsContext();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h4"> Revenue Details</Typography>
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
            showFullMonthYearPicker
            isClearable
            placeholderText="Select a month/year"
            className="custom-datepicker"
          />
        </Box>
      </Box>
      <Card>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Revenue</Typography>
        <RevenueDetailTable />
      </Card>
      <Card sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Expense</Typography>

        <ExpenseDetailTable />
      </Card>
      <Card sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Salary and Rent</Typography>

        <SalaryAndRentDetails />
      </Card>
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}
      >
        Submit
      </Button>
    </Container>
  );
}
