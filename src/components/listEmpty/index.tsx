import { Button, Typography, Box } from '@mui/material';

interface ListEmptyProps {
  text: string;
  textButton: string;
  handleClick: () => void;
}

const ListEmpty = ({ text, textButton, handleClick }: ListEmptyProps) => {

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {text}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {textButton}
      </Button>
    </Box>
  );
};

export default ListEmpty;
