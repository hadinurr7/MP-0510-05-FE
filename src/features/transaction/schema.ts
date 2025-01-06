// import * as Yup from 'yup';

// export const createTransactionSchema = Yup.object().shape({
//   eventId: Yup.number()
//     .required('Event is required')
//     .positive('Invalid event ID'),
//   quantity: Yup.number()
//     .required('Quantity is required')
//     .positive('Quantity must be positive')
//     .integer('Quantity must be an integer'),
//   attachment: Yup.mixed()
//     .test('fileSize', 'File is too large', (value) => {
//       if (!value) return true; // attachment is optional
//       return value.size <= 5 * 1024 * 1024; // 5MB limit
//     })
//     .test('fileType', 'Unsupported file format', (value) => {
//       if (!value) return true; // attachment is optional
//       return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//     }),
//   voucherId: Yup.number()
//     .nullable()
//     .positive('Invalid voucher ID'),
//   couponId: Yup.number()
//     .nullable()
//     .positive('Invalid coupon ID'),
// });

