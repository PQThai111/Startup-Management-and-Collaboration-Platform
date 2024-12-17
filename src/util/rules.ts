<<<<<<< HEAD
import * as yup from 'yup'
=======
import * as yup from 'yup';
>>>>>>> 76c812b (fix merge)

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
<<<<<<< HEAD
    .max(160, 'Can not exceed 160 characters')
})

export const projectSchema = yup.object({
  CourseId : yup
    .string()
    .required('CourseId is Required !'),
  StartupIdeaTitle : yup
=======
    .max(160, 'Can not exceed 160 characters'),
});

export const projectSchema = yup.object({
  CourseId: yup.string().required('CourseId is Required !'),
  StartupIdeaTitle: yup
>>>>>>> 76c812b (fix merge)
    .string()
    .required('Title is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
<<<<<<< HEAD
  StartupIdeaDescription : yup
=======
  StartupIdeaDescription: yup
>>>>>>> 76c812b (fix merge)
    .string()
    .required('Description is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
<<<<<<< HEAD
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
=======
  StartupIdeaCategory: yup
    .number()
    .required('Category is Required !')
    .positive('Must be positive number'),
  DesiredLecturerId: yup.string().required('DesiredLecturerId is Required !'),
  StartupIdeaId: yup.string().required(),
  SearchTerm: yup.string().trim().required('Tên sản phẩm là bắt buộc'),
  EventTypes: yup.array().of(yup.string().required()).required(),
  IsMandatory: yup.string().trim().required(),
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
>>>>>>> 76c812b (fix merge)
    .string()
    .required('MeetingAddress is Required !')
    .min(5, 'Can not under 5 characters')
    .max(200, 'Can not exceed 160 characters'),
<<<<<<< HEAD
  })

export type Schema = yup.InferType<typeof schema>
export type ProjectSchema = yup.InferType<typeof projectSchema>
export type RequestSchema = yup.InferType<typeof requestSchema>
export type RejectSchema = yup.InferType<typeof rejectSchema>
export type MentorTimeBookingSchema = yup.InferType<typeof mentorTimeBookingSchema>
=======
});

export type Schema = yup.InferType<typeof schema>;
export type ProjectSchema = yup.InferType<typeof projectSchema>;
export type RequestSchema = yup.InferType<typeof requestSchema>;
export type RejectSchema = yup.InferType<typeof rejectSchema>;
export type MentorTimeBookingSchema = yup.InferType<
  typeof mentorTimeBookingSchema
>;
>>>>>>> 76c812b (fix merge)
