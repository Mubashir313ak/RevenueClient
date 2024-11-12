// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { Grid } from '@mui/material';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import AnalyticsCurrentVisits from './analytics-current-visits';
import AnalyticsConversionRates from './analytics-conversion-rates';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';
import '../revenue/style.css';
// ----------------------------------------------------------------------

export default function Dashboard() {
  const settings = useSettingsContext();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h4"> Hi, Welcome back 👋</Typography>
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
      <Grid container spacing={2} pt={3}>
        <Grid xs={12} md={8} lg={4}>
          <AnalyticsCurrentVisits
            title="Category"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8} pl={2}>
          <AnalyticsConversionRates
            title="Total Revenue by stream"
            subheader="Our Generated Revenue"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={8} lg={4} pt={2}>
          <AnalyticsCurrentVisits
            title="Expense by Cateogry"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8} pl={2} pt={2}>
          <AnalyticsConversionRates
            title="Vender Expense"
            subheader="Our Generated Revenue"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
