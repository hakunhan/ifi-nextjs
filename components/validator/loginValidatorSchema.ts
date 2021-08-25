import * as Yup from 'yup';

export const LoginValidatorSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required()
})