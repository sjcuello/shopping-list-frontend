import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { selectItemList } from '../../redux/items';
import { useSelector } from 'react-redux';

const CardsContainer = () => {
  const itemList = useSelector(selectItemList);

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
        {itemList.map((item, index) => (
          <CardItem key={index} data={item} />
        ))}
      </Box>
    </Box>
  )
}

export default CardsContainer;
