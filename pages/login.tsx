import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn, useSession, getSession } from 'next-auth/client';
import { FormSubscription } from 'final-form';
import LoginForm from "../components/form/loginForm";
import { LocalAPI } from "../components/utils/api"

import styles from "../styles/components/login.module.scss";

export default function Login () {
  const router = useRouter();
  var [ session, loading ] = useSession();

  const [initialValues, setInitialValues] = useState({email: "", password: ""});
  const [loginError, setLoginError] = useState(false);

  const subscription =  { submitting: true };

  const handleLogin = (values) => {
    if (!values){
      return;
    }

    const email = values.email;
    const password = values.password;

    signIn('credentials',
      {
        email,
        password,
        redirect: false
      }
    ).then((data) => {
      if (data.error && data.error.length > 0){
        setInitialValues({email: email, password: ""})
        setLoginError(true);
        return;
      }

      router.push('/');
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <div className={styles.container}>
          <h1>Login</h1>
          <LoginForm 
            initialValues = {initialValues}
            handleLogin = {handleLogin}
            loginError = {loginError}
          />
        </div>
      </main>
    </div>
  )
}