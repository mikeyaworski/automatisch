import * as React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import useFormatMessage from 'hooks/useFormatMessage';
import useUsageAlert from 'hooks/useUsageAlert.ee';

export default function UsageAlert() {
  const formatMessage = useFormatMessage();
  const usageAlert = useUsageAlert();

  if (!usageAlert.showAlert) return (<React.Fragment />);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open
    >
      <Alert
        icon={false}
        sx={{ fontWeight: 500, minWidth: 410 }}
        severity={usageAlert.hasExceededLimit ? 'error' : 'warning'}
      >
        <Stack direction="row" gap={4} mb={1}>
          <Typography
            variant="subtitle2"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {usageAlert.alertMessage}
          </Typography>

          <Button
            component={Link}
            size="small"
            to={usageAlert.url}
            sx={{ minWidth: 100 }}
          >
            {formatMessage('usageAlert.viewPlans')}
          </Button>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={usageAlert.consumptionPercentage}
        />
      </Alert>
    </Snackbar>
  );
}
