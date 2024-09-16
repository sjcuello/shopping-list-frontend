import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import styles from './styles.module.css';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const Modal = ({ open, handleClose, handleConfirm }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <Box className={styles.modal}>
        <DialogTitle>
          <Typography variant='h4' fontWeight={500}>
            Delete Item?
          </Typography>
        </DialogTitle>
        <DialogContent >
          <DialogContentText>
            Are you sure you want to delete this item? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Modal;
