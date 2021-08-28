import Head from 'next/head';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

import { Drawer } from '@material-ui/core';

import Guard from '../../components/guard/guard';
import WebsiteAppBar from '../../components/appBar/appBar';
import NavbarLeft from '../../components/navbarLeft/navbarLeft';
import UserTable from '../../components/table/userTable';
import { getUsers, getUser, addUser, updateUser, deleteUser, getLastId } from '../../service/user.service';
import UserGenerator from '../../components/utils/userGenerator';
import IUser from '../../interfaces/user';
import UserForm from '../../components/form/userForm'

export async function getServerSideProps() {
  const data = await getUsers();
  const lastId = await getLastId();
  return {props: {data, lastId}}
}

export default function AdminDashboard({data, lastId}) {
  var userLastId = lastId.data;
  Guard();
  const [ navbarOpened, setNavbarOpen ] = useState(false);
  const [ userFormOpened, setUserFormOpened ] = useState(false);
  const [ users, setUsers ] = useState(data);
  const [ selectedUser, setSelectedUser] = useState(UserGenerator(userLastId));
  const [ updateUserData, setUpdateUserData ] = useState(false);

  const [ session, loading ] = useSession();

  if (loading) return null;
  if (!loading && !session) return (<></>);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpened);
  }

  const toggleUserForm = (user) => {
    if (user == undefined){
      setSelectedUser(UserGenerator(lastId.data));
      setUpdateUserData(false);
    }else{
      setSelectedUser(user);
      setUpdateUserData(true);
    }
    setUserFormOpened(!userFormOpened);
  }

  const handleSubmitUser = (values) => {
    values.updatedAt = new Date();

    if (updateUserData){
      for (var i = 0; i < users.length; i++){
        if (users[i]._id == values._id){
          users[i] = values;
          setUsers(users);
          updateUser(users[i]._id, values);
          setUserFormOpened(!userFormOpened);
          return;
        }
      }
    }else{
      users.push(values);
      setUsers(users);
      addUser(values);
      setUserFormOpened(!userFormOpened);
      userLastId++;
      return;
    }
  }
  
  const deleteSelectedUser = (id) => {
    if(confirm("Do you want to delete this user? Once deleted, user can not be restore.")){
      for (var i = 0; i < users.length; i++){
        if (users[i]._id == id){
          users.splice(i, 1);
          break;
        }
      }

      setUsers([...users]);
      deleteUser(id);
      return;
    }
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
        toggleUserForm = {toggleUserForm}
        deleteSelectedUser = {deleteSelectedUser}
      />
      <Drawer anchor={"right"} open={userFormOpened} onClose={toggleUserForm}>
        <UserForm
          selectedUser = {selectedUser}
          handleSubmitUser = {handleSubmitUser}
          toggleUserForm = {toggleUserForm}
        />
      </Drawer>
    </>
  );
}