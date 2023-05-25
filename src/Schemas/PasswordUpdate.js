import * as Yup from 'yup';

const PasswordUpdate = Yup.object({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required')
    .min(8, "Minimum length is 8")
    .max(20, "Maximum length is 20"),
  confirmPassword: Yup.string().required('Required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

export default PasswordUpdate;
