import { useState } from 'react';

import { Form } from 'react-final-form';
import { TextField, Select, makeValidate, makeRequired } from 'mui-rff';
import { Grid, Button, MenuItem, CssBaseline, Typography } from '@material-ui/core';

import { UserValidatorSchema } from '../validator/userValidatorSchema'
import styles from '../../styles/components/userForm.module.scss'

export default function UserForm(props){
    const validate = makeValidate(UserValidatorSchema);
    const required = makeRequired(UserValidatorSchema);

    const [submittedValues, setSubmittedValues] = useState(undefined)

    const formFields = [
        <TextField
            label="Name"
            name="name"
            required={required.name}
            variant="outlined"
        />,
        <TextField
            label="Email"
            name="email"
            required={required.email}
            variant="outlined"
        />,
        <TextField
            label="Password"
            name="password"
            type="password"
            required={required.password}
            variant="outlined"
        />,
        <Select name="role" label="Role" formControlProps={{ margin: 'normal' }}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
        </Select>,
        <Select name="activated" label="Activate" formControlProps={{ margin: 'normal' }}>
            <MenuItem value="true">Activated</MenuItem>
            <MenuItem value="false">Deactivated</MenuItem>
        </Select>
    ];

    return (
        <>
        <CssBaseline />
        <Form
            onSubmit={props.handleSubmitUser}
            subscription={true}
            initialValues={props.selectedUser}
            validate={validate}
            key={true}
            render={({handleSubmit, submitting, form}) => (
                <form
                    onSubmit={handleSubmit}
                    noValidate={true}
                >   
                    <Typography variant="h6" className={styles.title}>
                        User Form
                    </Typography>
                    {formFields.map((field, index) => (
                        <Grid 
                            className={styles.item}
                            item key={index}> 
                            {field}
                        </Grid>
                    ))}
                    <Button
                        className={styles.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Confirm
                    </Button>
                    <Button
                        className={styles.button}
                        variant="contained"
                        disabled={submitting}
                        onClick={props.toggleUserForm}
                    >
                        Cancel
                    </Button>
                </form>
            )}
        />
        </>
    );
}