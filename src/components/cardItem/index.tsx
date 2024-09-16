import { Box, IconButton, Typography } from '@mui/material';
import { Card } from '../../interfaces';
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  CheckBox as CheckBoxIcon
} from '@mui/icons-material';
import styles from './styles.module.css';
import { useAppDispatch } from '../../redux';
import { editItem } from '../../redux/items/thunk';
import { setFullItem } from '../../redux/itemDrawer';
import { switchDrawer } from '../../redux/drawer';
import { useCallback } from 'react';

interface CardProps {
  data: Card
}

const CardItem = ({ data }: CardProps) => {

  const { amount, description, isChecked, name } = data;
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    const { name, description, amount } = data
    dispatch(setFullItem({ name, description, amount }));
    dispatch(switchDrawer());
  }

  const handleCheck = useCallback(() => {
    const updatedItem = { ...data, isChecked: !isChecked };
    dispatch(editItem(updatedItem));
  }, [data, isChecked, dispatch]);

  const handleDelete = () => {
    const updatedItem = { ...data, markAsDeleted: !data.markAsDeleted };
    dispatch(editItem(updatedItem));
  }

  return (
    <Box className={`${styles.card} ${isChecked && styles.cardChecked}`}>
      <IconButton
        color='info'
        aria-label="Edit"
        onClick={handleCheck}
        className={styles.menuIcon}
      >
        {isChecked ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
      </IconButton>
      <Box className={styles.content}>
        <Box className={styles.dataContainer}>
          <Typography variant="h4" color='info' fontWeight="500" className={styles.name}>{name} </Typography>
          <Typography variant="h6" className={styles.description}>{description}</Typography>
          <Typography variant="body2" className={styles.amount}>Amount: {amount}</Typography>
        </Box>
        <Box>
          <IconButton
            color="default"
            aria-label="Edit"
            onClick={handleEdit}
            className={styles.menuIcon}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="default"
            aria-label="Delete"
            onClick={handleDelete}
            className={styles.menuIcon}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CardItem;
