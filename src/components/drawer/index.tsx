import { Box, Button, Divider, Drawer as DrawerMUI, FormHelperText, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material"
import Textarea from '@mui/joy/Textarea';
import StartIcon from '@mui/icons-material/Start';
import { useFormik } from 'formik';
import { itemValidationSchema } from "../../validations/item.validation";
import styles from './styles.module.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { useAppDispatch } from '../../redux';
import { ItemForm } from "../../interfaces";
import { addItem, editItem } from '../../redux/items/thunk';
import { selectDrawer, switchDrawer } from "../../redux/drawer";
import { useSelector } from "react-redux";
import { isItemDrawerEmpty, selectItemDrawer, setClear } from "../../redux/itemDrawer";
import { useEffect } from "react";
import { selectItemSelected } from "../../redux/itemSelected";
import { selectAllNames } from "../../redux/items";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Drawer = () => {
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
    dispatch(setClear());
  };

  const isDrawerOpen = useSelector(selectDrawer);
  const itemDrawer = useSelector(selectItemDrawer);
  const isNewItem = useSelector(isItemDrawerEmpty);
  const itemSelected = useSelector(selectItemSelected);
  const currentNames = useSelector(selectAllNames);

  const initialValues = isNewItem ? {
    name: '',
    description: '',
    amount: 0,
    date: new Date(),
  } : itemDrawer;
  const range = Array.from({ length: 10 }, (_, i) => i + 1);

  const formik = useFormik({
    initialValues,
    validationSchema: itemValidationSchema(isNewItem ? currentNames : currentNames.filter((name) => name !== itemDrawer.name)),
    onSubmit: (values: ItemForm) => {
      console.log('values', values)
      if (isNewItem) {
        dispatch(addItem(values));
      } else {
        const updatedItem = { ...itemSelected, ...values };
        dispatch(editItem(updatedItem));
      }
      formik.resetForm();
      handleDrawerToggle()
    },
    onReset: handleDrawerToggle,
  });

  useEffect(() => {
    if (isNewItem) {
      dispatch(setClear());
    }
    if (!isNewItem && itemDrawer) {
      formik.setValues(itemDrawer);
    }
  }, [isNewItem, itemDrawer]);


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
                <Box className={styles.amountSelect}>
                  <Select
                    id="amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    label="Select a Number"
                    placeholder="How many items?"
                    onBlur={formik.handleBlur}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    style={{ width: '100%' }}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    {range.map((number) => (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.amount && formik.errors.amount && <FormHelperText error>{formik.errors.amount}</FormHelperText>}
                </Box>
                <DatePicker
                  name="date"
                  label="Select a Date"
                  onChange={(date) => formik.setFieldValue('date', date)}
                />
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