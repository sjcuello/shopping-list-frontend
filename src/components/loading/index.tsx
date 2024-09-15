
import { Box, CircularProgress } from '@mui/material'
import styles from './styles.module.css';

const Loading = () => {
  return (
    <Box className={styles.container} >
      <CircularProgress color="primary" size="5rem" />
    </Box>
  )
}


export default Loading