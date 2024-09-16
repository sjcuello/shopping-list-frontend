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
import { setItemDrawer } from '../../redux/itemDrawer';
import { switchDrawer } from '../../redux/drawer';
import { useCallback, useState } from 'react';
import Modal from '../modal';
import { setItemSelected } from '../../redux/itemSelected';
import { deleteItemList } from '../../redux/items';


interface CardProps {
  data: Card
  isInTrashBin?: boolean
}

const CardItem = ({ data, isInTrashBin }: CardProps) => {

  const [open, setOpen] = useState(false);
  const { amount, description, isChecked, name } = data;
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    const { name, description, amount } = data
    dispatch(setItemSelected(data));
    dispatch(setItemDrawer({ name, description, amount }));
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
    dispatch(deleteItemList(data.id));
    setOpen(false)
  }

  const actionButtons = isInTrashBin
    ? [
      { icon: <UndoIcon />, onClick: handleSwitchMarkDelete, label: 'Restore' },
      { icon: <DeleteForeverIcon />, onClick: () => setOpen(true), label: 'Delete Forever' }
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
      <Modal open={open} handleClose={() => setOpen(false)} handleConfirm={handleDelete} />
    </Box>
  )
}

export default CardItem;
