
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const ErrorPage = () => {
  return (
    <Box className={styles.container}>
      <Typography variant='h1'>404 - Page Not Found</Typography>
      <Typography variant='body1'>The page you are looking for does not exist.</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go back to home
      </Button>
    </Box>
  );
};

export default ErrorPage;