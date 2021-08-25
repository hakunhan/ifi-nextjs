import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import { FormSubscription } from 'final-form';
import LoginForm from "../components/form/loginForm";
import { IAccount } from "../interfaces/account";

import styles from "../styles/components/login.module.scss";

export default function Login () {
  const router = useRouter();

  var initialValues: IAccount = {
    email: "",
    password: ""
  }

  var loginError = false;

  if (router.query.error){
    initialValues.email = router.query.email;
    loginError = router.query.error;
  }

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
        callbackUrl: `${window.location.origin}/admin-dashboard`
      }
    ).then((error) => {
      console.log(error);
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