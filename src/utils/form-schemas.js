import * as Yup from 'yup';

export const FormSchemas = 
{
  userSchema: 
  {
    register: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),

      validatePassword: Yup
        .string()
        .required("Please re-type your password")
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of passwrod.
        .oneOf([Yup.ref("password")], "Passwords does not match"),
    }),

    login : Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),

    update : Yup.object({
      name : Yup.string().required("The user name can\'t be empty")
      .min(2)
    })
  },

  characterSchema : {
    creation : Yup.object({
      name : Yup
      .string()
      .required('Character name is required')
      .min(2),

      description : Yup.
      string()
      .required('Character Description is required')
      .min(2),

      traits : Yup.array().required().typeError('Character traits are required')
      .min(1, 'Character traits are required')
    })
  },

  worldBuildingSchema : Yup.object({
    description : Yup.
    string()
    .required('The world building description is required')
    .min(2),
  }),

  promptSchema : Yup.object({
    model : Yup.string().required("You need select a model"),
    voice : Yup.string().required("You need select a voice actor")
  })
};

