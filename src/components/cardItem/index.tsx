import { Box, IconButton, Typography } from '@mui/material';
import { Card } from '../../interfaces';
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  CheckBox as CheckBoxIcon,
  DeleteForeverOutlined as DeleteForeverIcon,
  UndoOutlined as UndoIcon
} from '@mui/icons-material';
import styles from './styles.module.css';
import { useAppDispatch } from '../../redux';
import { editItem, removeItem } from '../../redux/items/thunk';
import { setFullItem } from '../../redux/itemDrawer';
import { switchDrawer } from '../../redux/drawer';
import { useCallback } from 'react';

interface CardProps {
  data: Card
  isInTrashBin?: boolean
}

const CardItem = ({ data, isInTrashBin }: CardProps) => {

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

  const handleSwitchMarkDelete = () => {
    const updatedItem = { ...data, markAsDeleted: !data.markAsDeleted };
    dispatch(editItem(updatedItem));
  }

  const handleDelete = () => {
    dispatch(removeItem(data.id));
  }

  const actionButtons = isInTrashBin
    ? [
      { icon: <UndoIcon />, onClick: handleSwitchMarkDelete, label: 'Restore' },
      { icon: <DeleteForeverIcon />, onClick: handleDelete, label: 'Delete Forever' }
    ]
    : [
      { icon: <EditIcon />, onClick: handleEdit, label: 'Edit' },
      { icon: <DeleteIcon />, onClick: handleSwitchMarkDelete, label: 'Mark as Deleted' }
    ];

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
          {
            actionButtons.map((button, index) => (
              <IconButton
                key={index}
                color="default"
                aria-label={button.label}
                onClick={button.onClick}
                className={styles.menuIcon}
              >
                {button.icon}
              </IconButton>
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}

export default CardItem;
