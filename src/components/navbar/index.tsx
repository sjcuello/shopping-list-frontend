import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Add as AddIcon, DeleteSweepOutlined as DeleteSweepOutlinedIcon } from '@mui/icons-material';
import styles from './styles.module.css';
import Drawer from '../drawer';
import { useAppDispatch } from '../../redux';
import { switchDrawer } from '../../redux/drawer';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
  };
  const navigate = useNavigate();

  const handleTrashClick = () => {
    navigate('/trash-bin');
  };

  const handleHomeClick = () => {
    navigate('/');
  }

  return (
    <Box className={styles.headerContainer}>
      <AppBar className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography
            variant="h6"
            component="div"
            className={styles.title}
            onClick={handleHomeClick}
          >
            Shopping List
          </Typography>
          <Box className={styles.iconContainer}>
            <IconButton
              color="inherit"
              aria-label="open trash bin"
              edge="start"
              onClick={handleTrashClick}
              className={styles.icon}
            >
              <Tooltip title="Trash bin">
                <DeleteSweepOutlinedIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={styles.icon}
            >
              <Tooltip title="Add Item">
                <AddIcon />
              </Tooltip>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer />
    </Box>
  )
}

export default Navbar;
