import Head from 'next/head';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next'

import Guard from '../../components/guard/guard';
import WebsiteAppBar from '../../components/appBar/appBar';
import NavbarLeft from '../../components/navbarLeft/navbarLeft';
import UserTable from '../../components/table/userTable';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../../service/user.service';
import UserGenerator from '../../components/utils/userGenerator';
import IUser from '../../interfaces/user';

export async function getServerSideProps() {
  const data = await getUsers();
  return {props: {data}}
}

export default function AdminDashboard({data}) {
  Guard();

  const [navbarOpened, setNavbarOpen] = useState(false);
  const [users, setUsers] = useState(data);
  const [selectedUser, setSelectedUser] = useState();
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
      <UserTable
        users = {users}
      />
    </>
  );
}