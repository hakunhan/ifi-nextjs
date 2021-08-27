import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Guard(){
    const [ session ] = useSession();

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
    }, []);
}