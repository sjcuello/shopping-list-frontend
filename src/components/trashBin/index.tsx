import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { selectItemList } from '../../redux/items';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllItems } from '../../redux/items/thunk';
import Loading from '../loading';
import { switchDrawer } from '../../redux/drawer';

const TrashBin = () => {
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
        status === 'succeeded' && data.length > 0 ? (<>
          <Box className={styles.titleContainer}>
            <Typography variant='h2'>Trash Bin</Typography>
            <Button
              variant="contained"
              color='primary'
              className={styles.button}
              onClick={handleDrawerToggle}
            >Add Item</Button>
          </Box>
          <Box className={styles.cardContainer}>
            {data.map((item, index) => {
              if (item.markAsDeleted) {
                return <CardItem key={index} data={item} />;
              }
            })}
          </Box>
        </>
        ) : (
          <Loading />
        )
      }
    </Box>
  )
}

export default TrashBin;
