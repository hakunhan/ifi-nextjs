import {useState} from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/client";

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { LocalAPI } from '../../components/utils/api'
import styles from '../../styles/components/navbarLeft.module.scss'

export default function NavbarLeft(props){
    const logout = () =>{
        signOut({
          callbackUrl: LocalAPI + "/login"
        })
    }

    return (
        <>
            <Drawer anchor={"left"} open={props.navbarOpened} onClose={props.toggleNavbar}>
                <List className={styles.list}>
                    <Link href={`/${props.role}-dashboard`}>
                        <ListItem button key={"Dashboard"}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary = "Dashboard"/>
                        </ListItem>
                    </Link>
                    <ListItem button key = {"Logout"} onClick = {logout}>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText primary = "Logout"/>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}