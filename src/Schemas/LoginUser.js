import * as Yup from 'yup'

const LoginUser = Yup.object().shape({
  username: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string()
    .min(8, "Minimum length is 8")
    .max(20, "Maximum length is 20"),
})

export default LoginUser;
