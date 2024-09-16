import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
// import { useState } from 'react';
import styles from './styles.module.css';
import Drawer from '../drawer';
import { useAppDispatch } from '../../redux';
import { switchDrawer } from '../../redux/drawer';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
  };

  return (
    <Box className={styles.headerContainer}>
      <AppBar className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography
            variant="h6"
            component="div"
            className={styles.title}
          >
            Shopping List
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuIcon}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer />
    </Box>
  )
}

export default Navbar;
