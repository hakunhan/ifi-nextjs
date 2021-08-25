import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';

export default function Home() {
  const [ session, loading ] = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session){
    router.push('/login');
    }
    if (session && session.user.role == 'admin'){
      router.push('/admin-dashboard');
    }
    if (session && session.user.role == 'user'){
      router.push('/user-dashboard');
    }
  });
  
  return(
    <>
    </>
  );
}
