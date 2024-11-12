// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import RevenueExpenseForm from './RevenueForm';

// ----------------------------------------------------------------------

export default function Revenue() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <RevenueExpenseForm />
    </Container>
  );
}
