import * as Yup from 'yup'

const SignUpUser = Yup.object().shape({
  username: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string()
    .min(8, "Minimum length is 8")
    .max(20, "Maximum length is 20"),
  firstName: Yup.string()
    .min(2, "Must be greater than 2")
    .max(50, "Must be less than 50")
    .required('Required'),
  lastName: Yup.string()
    .min(2, "Must be greater than 2")
    .max(50, "Must be less than 50")
    .required('Required'),
  birthdate: Yup.string().required("Required")
})

export default SignUpUser;
