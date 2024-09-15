import { Box, Button, Divider, Drawer as DrawerMUI, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material"
import Textarea from '@mui/joy/Textarea';
import StartIcon from '@mui/icons-material/Start';
import { useFormik } from 'formik';
import { itemValidationSchema } from "../../validations/item.validation";
import styles from './styles.module.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { useAppDispatch } from '../../redux';
// import { ItemForm } from "../../interfaces";
import { addItem } from "../../redux/items";

interface DrawerProps {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
}

const Drawer = ({ isDrawerOpen, handleDrawerToggle }: DrawerProps) => {

  const dispatch = useAppDispatch();
  const range = Array.from({ length: 10 }, (_, i) => i + 1);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      amount: 0,
    },
    validationSchema: itemValidationSchema,
    onSubmit: (values) => {
      dispatch(addItem(values));
    },
    onReset: handleDrawerToggle
  });

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <DrawerMUI
      container={container}
      anchor='right'
      variant="temporary"
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box className={styles.drawer}>
        <Box className={`${styles.topContainer} ${styles.basicXPadding}`}>
          <Typography variant="h6" className={styles.drawerTitle}>
            Shopping List
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ padding: 0 }}
          >
            <StartIcon />
          </IconButton>
        </Box>

        <Divider />
        <Box className={`${styles.content} ${styles.basicXPadding}`}>
          <Box className={styles.infoContainer}>
            <Typography variant="body1" fontWeight="500" className={styles.drawerTitle}>
              Add an Item
            </Typography>
            <Typography variant="body2" fontWeight="400" className={styles.drawerTitle}>
              Add your new item bellow
            </Typography>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className={styles.form}>
              <Box className={styles.formInputs}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Item Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <CssVarsProvider>
                  <Textarea
                    id="description"
                    name="description"
                    minRows={4}
                    size="lg"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    placeholder="Description"
                    endDecorator={
                      <Box className={styles.charCounter}>
                        <p>
                          {formik.values.description.length} /100
                        </p>
                      </Box>
                    }
                  />
                </CssVarsProvider>
                <Select
                  id="amount"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  label="Select a Number"
                  placeholder="How many items?"
                >
                  <MenuItem value={0}>0</MenuItem>
                  {range.map((number) => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box className={`${styles.buttonContainer} ${styles.basicYPadding}`}>
                <Button color="inherit" variant="text" type="reset">
                  Cancel
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Add new item
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </DrawerMUI >
  )
}

export default Drawer