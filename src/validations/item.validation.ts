import * as yup from 'yup';

export const itemValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  description: yup
    .string()
    .max(100, 'Description is too long. Max 100 characters'),
  elements: yup
    .number()
    .positive()
    .integer()
    .required('Number of elements is required'),
});
