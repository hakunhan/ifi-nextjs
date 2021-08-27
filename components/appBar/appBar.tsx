import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../../styles/components/appbar.module.scss';
import { signOut } from "next-auth/client";
import { useSession } from 'next-auth/client';
import { LocalAPI } from '../../components/utils/api'

export default function WebsiteAppBar(props){
    const [session] = useSession();
    const user = session.user.name;

    const logout = () =>{
        signOut({
          callbackUrl: LocalAPI + "/login"
        })
    }

    return (
        <AppBar position="static" className={styles.container}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" 
                    onClick = {props.toggleNavbar}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={styles.title}>
                    Dashboard
                </Typography>
                <Typography variant="h6" className={styles.username}>
                    Welcome, {user}
                </Typography>
                <div>
                    <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}