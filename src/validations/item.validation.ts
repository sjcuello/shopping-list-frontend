import * as yup from 'yup';

export const itemValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  description: yup
    .string()
    .max(100, 'Description is too long. Max 100 characters'),
  amount: yup
    .number()
    .moreThan(0, 'Number of elements must be greater than 0')
    .required('Number of elements is required'),
});
