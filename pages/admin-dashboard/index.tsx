import Head from 'next/head';
import { useState } from 'react';
import { useSession } from 'next-auth/client';

import Guard from '../../components/guard/guard';
import WebsiteAppBar from '../../components/appBar/appBar';
import NavbarLeft from '../../components/navbarLeft/navbarLeft.tsx'

export default function AdminDashboard() {
  Guard();
  const [navbarOpened, setNavbarOpen] = useState(false);
  const [ session, loading ] = useSession();
  if (loading) return null;
  if (!loading && !session) return (<></>);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpened);
  }
  
  return(
    <>
      <WebsiteAppBar
        toggleNavbar = {toggleNavbar}
      />
      <NavbarLeft
        navbarOpened = {navbarOpened}
        toggleNavbar = {toggleNavbar}
        role = {session.user.role}
      />
    </>
  );
}