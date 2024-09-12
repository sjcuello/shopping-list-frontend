import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import styles from './styles.module.css';

const Header: React.FC = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = ['Home', 'About', 'Contact'];

  const container = window !== undefined ? () => window.document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box className="drawer" onClick={handleDrawerToggle}>
      <Typography variant="h6" className={styles.drawerTitle}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton className={styles.drawerButton}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className={styles.headerContainer}>
      <AppBar component="nav" className={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className="title"
          >
            MUI
          </Typography>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          anchor='right'
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

export default Header;
