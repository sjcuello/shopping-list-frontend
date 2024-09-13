import { Box } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';

// interface CardsContainerProps {
// }

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
    <Box className={ styles.container}>
      {mockData.map((card) => (
        <CardItem key={card.id} data={card} />
      ))}
    </Box>
  )
}

export default CardsContainer;
