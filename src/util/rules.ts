import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is Required !')
    .email()
    .min(5, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters'),
  password: yup
    .string()
    .required('Password Is Required !')
    .min(6, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters'),
});

export const projectSchema = yup.object({
  CourseId: yup.string().required('CourseId is Required !'),
  StartupIdeaTitle: yup
    .string()
    .required('Title is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  StartupIdeaDescription: yup
    .string()
    .required('Description is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  StartupIdeaCategory: yup
    .number()
    .required('Category is Required !')
    .positive('Must be positive number'),
  DesiredLecturerId: yup.string().required('DesiredLecturerId is Required !'),
  StartupIdeaId: yup.string().required(),
  SearchTerm: yup.string().trim().required('Tên sản phẩm là bắt buộc'),
  EventTypes: yup.array().of(yup.string().required()).required(),
  IsMandatory: yup.string().trim().required(),
  ProjectStatus: yup.number().required(),
<<<<<<< HEAD
=======
  projectCategories: yup.array().of(yup.string().required()).required(),
>>>>>>> e31efde (Staff manage main)
});

export const requestSchema = yup.object({
  RequestId: yup.string().required('RequestId is Required !'),
  MentorId: yup.string().required('MentorId is Required !'),
  LecturerId: yup.string().required('LecturerId is Required !'),
});

export const rejectSchema = yup.object({
  Reason: yup
    .string()
    .required('Reason is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
});

export const mentorTimeBookingSchema = yup.object({
  Note: yup
    .string()
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  MeetingAddress: yup
    .string()
    .required('MeetingAddress is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
});

export const eventSchema = yup.object({
  Title: yup
    .string()
<<<<<<< HEAD
    .required()
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
=======
    .required('Title is required')
    .matches(/^[\w\s]+$/, 'Only alphanumeric and spaces are allowed') // Allow spaces
    .min(5, 'Cannot be under 5 characters')
    .max(200, 'Cannot exceed 160 characters'),
>>>>>>> e31efde (Staff manage main)
  Description: yup
    .string()
    .required()
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  Type: yup.number().required(),
  StartDate: yup.string().required(),
  EndDate: yup.string().required(),
  Location: yup
    .string()
    .required()
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  Tag: yup
    .string()
    .required()
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  RegistrationLink: yup
    .string()
    .required()
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  IsMandatory: yup.bool().required(),
});

export type Schema = yup.InferType<typeof schema>;
export type ProjectSchema = yup.InferType<typeof projectSchema>;
export type RequestSchema = yup.InferType<typeof requestSchema>;
export type RejectSchema = yup.InferType<typeof rejectSchema>;
export type EventSchema = yup.InferType<typeof eventSchema>;
export type MentorTimeBookingSchema = yup.InferType<
  typeof mentorTimeBookingSchema
>;
