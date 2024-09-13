import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';

const CardsContainer = () => {

  const mockData = [
    {
      id: 1,
      name: 'Card 1',
      description: 'Description 1',
      amount: 2,
      isChecked: false,
    },
    {
      id: 2,
      name: 'Card 2',
      description: 'Description 2',
      amount: 3,
      isChecked: false,
    },
    {
      id: 3,
      name: 'Card 3',
      description: 'Description 3',
      amount: 4,
      isChecked: false,
    },
    {
      id: 4,
      name: 'Card 4',
      description: 'Description 4',
      amount: 5,
      isChecked: true,
    },
  ]

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant='h2'>Your Items</Typography>
        <Button
          variant="contained"
          color='primary'
          className={styles.button}>Add Item</Button>
      </Box>
      <Box className={styles.cardContainer}>
        {mockData.map((card) => (
          <CardItem key={card.id} data={card} />
        ))}
      </Box>
    </Box>
  )
}

export default CardsContainer;
