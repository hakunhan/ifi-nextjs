import { React, useState } from 'react';
import Moment from 'react-moment';

import { Button, CssBaseline, Paper, Typography, Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, TableFooter, TablePagination, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles'
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

export default function UserTable(props){
    if (!props.users) return null;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.users.length - page * rowsPerPage);

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
                    User Dashboard
                </Typography>
                <div>
                    <Button variant="contained" 
                    className={styles.add_user}
                    onClick={() => props.toggleUserForm(undefined)}>Add user</Button>
                </div>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right" className = {styles.table_head}>Id</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Name</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Email</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Role</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Created At</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Updated At</TableCell>
                        <TableCell align="right" className = {styles.table_head}>Activated</TableCell>
                        <TableCell align="right" className={styles.table_head_action}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): props.users
                        ).map((user) => (
                        <TableRow key = {user.id}>
                            <TableCell component="th" scope='row' align="right">{user._id}</TableCell>
                            <TableCell align="right">{user.name}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                            <TableCell align="right">
                                <Moment local format="DD/MM/YYYY HH:mm">
                                    {user.createdAt}
                                </Moment>
                            </TableCell>
                            <TableCell align="right">
                                <Moment local format="DD/MM/YYYY HH:mm">
                                    {user.updatedAt}
                                </Moment>
                            </TableCell>
                            <TableCell align="right" className={user.activated ? styles.activate : styles.deactivate}>
                                {user.activated ? "Activated" : "Deactivated"}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => props.toggleUserForm(user)}>
                                    <EditIcon color="primary"/>
                                </IconButton>
                                <IconButton onClick={() => props.deleteSelectedUser(user._id)}>
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
                        count={props.users.length}
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