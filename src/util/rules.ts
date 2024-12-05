import * as yup from 'yup'

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
    .max(160, 'Can not exceed 160 characters')
})

export const projectSchema = yup.object({
  CourseId : yup
    .string()
    .required('CourseId is Required !'),
  StartupIdeaTitle : yup
    .string()
    .required('Title is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  StartupIdeaDescription : yup
    .string()
    .required('Description is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
    StartupIdeaCategory : yup
    .number()
    .required('Category is Required !')
    .positive("Must be positive number"),
  DesiredLecturerId : yup
    .string()
    .required('DesiredLecturerId is Required !'),
    SearchTerm: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const requestSchema = yup.object({
  RequestId : yup
    .string()
    .required('RequestId is Required !'),
  MentorId : yup
    .string()
    .required('MentorId is Required !'),
  LecturerId : yup
    .string()
    .required('LecturerId is Required !')
  })

  export const rejectSchema = yup.object({
    Reason : yup
      .string()
      .required('Reason is Required !')
      .min(5, 'Can not under 5 characters')
      .max(200, 'Can not exceed 160 characters'),
  })

  export const mentorTimeBookingSchema = yup.object({
    Note : yup
      .string()
      .min(5, 'Can not under 5 characters')
      .max(200, 'Can not exceed 160 characters'),
    MeetingAddress : yup
    .string()
    .required('MeetingAddress is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
  })

export type Schema = yup.InferType<typeof schema>
export type ProjectSchema = yup.InferType<typeof projectSchema>
export type RequestSchema = yup.InferType<typeof requestSchema>
export type RejectSchema = yup.InferType<typeof rejectSchema>
export type MentorTimeBookingSchema = yup.InferType<typeof mentorTimeBookingSchema>