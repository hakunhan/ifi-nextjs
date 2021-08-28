import { React, useState } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';

import { Button, CssBaseline, Paper, Typography, Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, TableFooter, TablePagination, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import styles from '../../styles/components/table.module.scss';

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={styles.pagination_container}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function ProductTable(props){
    if (!props.products) return null;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.products.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
        <CssBaseline/>
        <TableContainer component={Paper} className={styles.container}>
            <Toolbar>
                <Typography variant="h6" component="div" className={styles.table_title}>
                    Product Dashboard
                </Typography>
                <div>
                    <Button variant="contained" 
                    className={styles.add}
                    onClick={() => props.toggleProductForm(undefined)}>Add product</Button>
                </div>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right" className = {styles.table_head}>Id</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Product image</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Name</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Quantity</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Price</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Status</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Created At</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Updated At</TableCell>
                        <TableCell align="right" className={styles.table_head_action}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? props.products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): props.products
                        ).map((product) => (
                        <TableRow key = {product._id}>
                            <TableCell component="th" scope='row' align="right">{product._id}</TableCell>
                            <TableCell align="right">
                                <img className={styles.img} src={product.imgUrl} alt="No img" />
                            </TableCell>
                            <TableCell align="right">{product.name}</TableCell>
                            <TableCell align="right">{product.quantity}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right" className={product.status ? styles.activate : styles.deactivate}>
                                {product.status ? "On sell" : "Out of stock!"}
                            </TableCell>
                            <TableCell align="right">
                                <Moment local format="DD/MM/YYYY HH:mm">
                                    {product.createdAt}
                                </Moment>
                            </TableCell>
                            <TableCell align="right">
                                <Moment local format="DD/MM/YYYY HH:mm">
                                    {product.updatedAt}
                                </Moment>
                            </TableCell>
                            <TableCell align="right">
                                <Link href = {`/user-dashboard/${product._id}`}>
                                  <IconButton>
                                    <VisibilityIcon color="primary"/>
                                  </IconButton>
                                </Link>
                                <IconButton onClick={() => props.toggleProductForm(product)}>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton onClick={() => props.deleteSelectedProduct(product._id)}>
                                    <DeleteIcon color="secondary"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[1, 2, 5, 10, 25]}
                        colSpan={10}
                        count={props.products.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </>
    )
}