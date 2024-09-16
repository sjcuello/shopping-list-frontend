import { Button, Typography, Box } from '@mui/material';
import styles from './styles.module.css';

interface ListEmptyProps {
  text: string;
  textButton: string;
  handleClick: () => void;
}

const ListEmpty = ({ text, textButton, handleClick }: ListEmptyProps) => {

  return (
    <Box className={styles.container}>
      <Box className={styles.frame}>
        <Typography variant="h3">
          {text}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          {textButton}
        </Button>
      </Box>
    </Box>
  );
};

export default ListEmpty;
