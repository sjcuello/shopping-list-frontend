import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { fetchData, selectItemList } from '../../redux/items';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { fetchAllItems } from '../../redux/items/thunk';

const CardsContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { data, status, error } = useSelector(selectItemList);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === 'pending') {
    // TODO
    return <div>Loading...</div>;
  }

  if (status === 'rejected') {
    // TODO
    return <div>Error: {error}</div>;
  }


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
        {data.map((item, index) => (
          <CardItem key={index} data={item} />
        ))}
      </Box>
    </Box>
  )
}

export default CardsContainer;
