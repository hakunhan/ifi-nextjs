import * as Yup from 'yup';

export const LoginValidatorSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!").email("Invalid email input!"),
    password: Yup.string().required("Password is required!")
})