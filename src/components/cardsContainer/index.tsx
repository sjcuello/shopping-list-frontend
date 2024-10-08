import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { selectItemList } from '../../redux/items';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllItems } from '../../redux/items/thunk';
import Loading from '../loading';
import { switchDrawer } from '../../redux/drawer';
import ListEmpty from '../listEmpty';

const CardsContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { data, status } = useSelector(selectItemList);

  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllItems());
    }
  }, [status, dispatch]);

  return (
    <Box className={styles.container}>
      {
        status === 'succeeded' && data.length > 0 && data.some(item => !item.markAsDeleted) ? (<>
          <Box className={styles.titleContainer}>
            <Typography variant='h2'>Your Items</Typography>
            <Button
              variant="contained"
              color='primary'
              className={styles.button}
              onClick={handleDrawerToggle}
            >Add Item</Button>
          </Box>
          <Box className={styles.cardContainer}>
            {data.map((item, index) => {
              if (!item.markAsDeleted) {
                return <CardItem key={index} data={item} />;
              }
            })}
          </Box>
        </>
        ) : status === 'pending' ? (
          <Loading />
        ) : <ListEmpty
          text="Your shopping list is empty :("
          textButton="Add your first item"
          handleClick={handleDrawerToggle}
        />
      }
    </Box>
  )
}

export default CardsContainer;
