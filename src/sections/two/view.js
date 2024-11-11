// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import RevenueExpenseForm from './RevenueForm';
import MonthPicker from './MonthDropdown';

// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Revenue Details</Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* This makes sure the MonthPicker is pushed to the right */}
        <MonthPicker />
      </Box>

      <RevenueExpenseForm />
    </Container>
  );
}
