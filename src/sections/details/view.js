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
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import RevenueDetailTable from './RevenueDetailTable';
import ExpenseDetailTable from './ExpenseDetailTable';
import SalaryAndRentDetails from './SalaryAndRentDetails';
import '../revenue/style.css';
// eslint-disable-next-line import/order
import { GetSubmissionByDate, GetSubmissionDifference } from 'src/api/submission';
// ----------------------------------------------------------------------

export default function Detail() {
  const settings = useSettingsContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [submission, setSubmission] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        if (selectedDate) {
          const adjustedDate = new Date(selectedDate);
          adjustedDate.setMonth(adjustedDate.getMonth() + 1);
          const formattedDate = adjustedDate.toISOString().split('T')[0];
          const data = await GetSubmissionDifference(formattedDate);
          console.log('data', data);
          setSubmission(data);
        }
      } catch (error) {
        console.error('Failed to fetch submission:', error);
      }
    };

    fetchSubmission();
  }, [selectedDate]);
  console.log('submission', submission);
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

      <RevenueDetailTable data={submission?.data} />
    </Container>
  );
}
