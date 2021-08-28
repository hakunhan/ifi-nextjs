import * as Yup from 'yup';
import { checkDuplicateEmail } from "../../service/user.service"

function checkDuplicate(valueToCheck){
    return new Promise(async (resolve, reject) => {
        let isDuplicate = checkDuplicateEmail(valueToCheck);
        resolve(isDuplicate);
    });
}

export const UserValidatorSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!").email("Invalid email!")
    .test('checkDuplicateEmail', 'This email has already used!', async function(value){
        if (value) {
            const isDuplicateExists = await checkDuplicate(value);
            return !isDuplicateExists;
        }
        return true;
    }),
    password: Yup.string().required("Password is required!")
})