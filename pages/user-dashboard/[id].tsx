import { useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'

import { CssBaseline, Typography, Container, Grid } from '@material-ui/core'

import Guard from '../../components/guard/guard';
import WebsiteAppBar from '../../components/appBar/appBar';
import NavbarLeft from '../../components/navbarLeft/navbarLeft';
import { getProduct } from '../../service/product.service';

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session || session.user.role != "user") {
        return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
        };
    }
    
    const data = await getProduct(context.params.id);
    return {props: {data}}
}

export default function ProductDetails({data}){
    const [ navbarOpened, setNavbarOpen ] = useState(false);
    const [ product, setProduct ] = useState(data);

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

            <CssBaseline />
            <Container>
                <Grid container spacing = {2}>
                    <Grid item xs={6}>
                        <img src={product.imgUrl} alt="Loading"/>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <Typography variant = "h3">{product.name}</Typography>
                            <Typography variant = "h5">Price: {product.price}></Typography>
                            <Typography variant = "h5">Status: {product.status}</Typography>
                            <Typography variant = "h5">Quantity: {product.quantity}</Typography>
                            <Typography variant = "h4">Description: {product.description}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
