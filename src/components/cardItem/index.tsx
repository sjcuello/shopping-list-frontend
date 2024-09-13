import { Box, IconButton, Typography } from '@mui/material';
import { Card } from '../../interfaces';
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  CheckBox as CheckBoxIcon
} from '@mui/icons-material';
import styles from './styles.module.css';

interface CardProps {
  data: Card
}

const CardItem = ({ data }: CardProps) => {

  const handleEdit = () => { }

  const handleDelete = () => { }

  return (
    <Box className={styles.card}>

      <IconButton
        color='info'
        aria-label="Edit"
        onClick={handleEdit}
        className={styles.menuIcon}
      >
        {data.isChecked ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
      </IconButton>
      <Box className={styles.content}>

        <Box className={styles.dataContainer}>
          <Typography variant="h3" color='info' className={styles.name}>{data.name} </Typography>
          <Typography variant="h4" className={styles.description}>{data.description}</Typography>
          <Typography variant="h6" className={styles.amount}>Amount: {data.amount}</Typography>
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
