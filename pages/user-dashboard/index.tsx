import Head from 'next/head';
import { useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

import { Drawer } from '@material-ui/core';

import Guard from '../../components/guard/guard';
import WebsiteAppBar from '../../components/appBar/appBar';
import NavbarLeft from '../../components/navbarLeft/navbarLeft';
import ProductTable from '../../components/table/productTable';
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct, getLastId } from '../../service/product.service';
import ProductGenerator from '../../components/utils/productGenerator';
import IProduct from '../../interfaces/product';
import ProductForm from '../../components/form/productForm'

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role != "user") {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const data = await getProducts();
  const lastId = await getLastId();
  return {props: {data, lastId}}
}

export default function AdminDashboard({data, lastId}) {
  var productLastId = lastId.data;
  Guard();
  const [ navbarOpened, setNavbarOpen ] = useState(false);
  const [ productFormOpened, setProductFormOpened ] = useState(false);
  const [ products, setProducts ] = useState(data);
  const [ selectedProduct, setSelectedProduct] = useState(ProductGenerator(productLastId));
  const [ updateProductData, setUpdateProductData ] = useState(false);

  const [ session, loading ] = useSession();

  if (loading) return null;
  if (!loading && !session) return (<></>);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpened);
  }

  const toggleProductForm = (product) => {
    if (product == undefined){
      setSelectedProduct(ProductGenerator(productLastId ));
      setUpdateProductData(false);
    }else{
      setSelectedProduct(product);
      setUpdateProductData(true);
    }
    setProductFormOpened(!productFormOpened);
  }

  const handleSubmitProduct = (values) => {
    values.updatedAt = new Date();
    if (values.quantity == 0){
      values.status = false;
    }

    if (updateProductData){
      for (var i = 0; i < products.length; i++){
        if (products[i]._id == values._id){
          products[i] = values;
          setProducts(products);
          updateProduct(products[i]._id, values);
          setProductFormOpened(!productFormOpened);
          return;
        }
      }
    }else{
      products.push(values);
      setProducts(products);
      addProduct(values);
      setProductFormOpened(!productFormOpened);
      productLastId++;
      return;
    }
  }
  
  const deleteSelectedProduct = (id) => {
    if(confirm("Do you want to delete this product? Once deleted, product can not be restore.")){
      for (var i = 0; i < products.length; i++){
        if (products[i]._id == id){
          products.splice(i, 1);
          break;
        }
      }

      setProducts([...products]);
      deleteProduct(id);
      productLastId--;
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
      <ProductTable
        products = {products}
        toggleProductForm = {toggleProductForm}
        deleteSelectedProduct = {deleteSelectedProduct}
      />
      <Drawer anchor={"right"} open={productFormOpened} onClose={toggleProductForm}>
        <ProductForm
          selectedProduct = {selectedProduct}
          handleSubmitProduct = {handleSubmitProduct}
          toggleProductForm = {toggleProductForm}
        />
      </Drawer>
    </>
  );
}