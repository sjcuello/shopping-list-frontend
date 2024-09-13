import { Box, IconButton } from '@mui/material';
import { Card } from '../../interfaces';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import styles from './styles.module.css';

interface CardProps {
  data: Card
}

const CardItem = ({ data }: CardProps) => {

  const handleEdit = () => { }

  const handleDelete = () => { }

  return (
    <Box className={styles.card}>
      {data.isChecked ? 'Checked' : 'Not checked'}
      <Box className={styles.dataContainer}>
        <h1>{data.name} - {data.amount}</h1>
        <p>{data.description}</p>
      </Box>
      <IconButton
        color="inherit"
        aria-label="Edit"
        onClick={handleEdit}
        className={styles.menuIcon}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDelete}
        className={styles.menuIcon}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default CardItem;
