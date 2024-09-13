import { Container } from '@mui/material';
import styles from './styles.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <Container
      maxWidth={false}
      className={styles.container} >
      {children}
    </Container>
  )
}

export default Layout;
