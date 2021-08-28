import * as Yup from 'yup';

export const ProductValidatorSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    quantity: Yup.number("Please input an number").required("Quantity is required").min(0, "Minimun quantity is 0!"),
    price: Yup.number("Please input an number").required("Price is required").min(0, "Minimun price is 0!"),
})