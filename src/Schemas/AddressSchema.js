import * as Yup from 'yup'

const Address = Yup.object().shape({
  street: Yup.string().required('Required'),
  street2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required')
});

export default Address;
