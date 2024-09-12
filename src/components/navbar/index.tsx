import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import styles from './styles.module.css';
import Drawer from '../drawer';

const Header: React.FC = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <Box className={styles.headerContainer}>
      <AppBar component="nav" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography
            variant="h6"
            component="div"
            className="title"
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
      <Drawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </Box>
  )
}

export default Header;
