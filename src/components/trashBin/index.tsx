import { Box, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { selectItemList } from '../../redux/items';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllItems } from '../../redux/items/thunk';
import Loading from '../loading';
import ListEmpty from '../listEmpty';
import { useNavigate } from 'react-router-dom';

const TrashBin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { data, status } = useSelector(selectItemList);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllItems());
    }
  }, [status, dispatch]);

  return (
    <Box className={styles.container}>
      {
        data.length > 0 && data.some(item => item.markAsDeleted) ? (<>
          <Box className={styles.titleContainer}>
            <Typography variant='h2'>Trash Bin</Typography>
          </Box>
          <Box className={styles.cardContainer}>
            {data.map((item, index) => {
              if (item.markAsDeleted) {
                return <CardItem key={index} data={item} isInTrashBin />;
              }
            })}
          </Box>
        </>
        ) : status === 'pending' ? (
          <Loading />
        ) : <ListEmpty
          text="Your trash bin is empty :)"
          textButton="Back to Home"
          handleClick={() => navigate('/')}
        />
      }
    </Box>
  )
}

export default TrashBin;
