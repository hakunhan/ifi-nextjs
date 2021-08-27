import Moment from 'react-moment';

import { CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function UserTable(props){
    if (!props.users) return null;

    return (
        <CssBaseline>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Updated At</TableCell>
                            <TableCell align="right">Activated</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.users.map((user) => (
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
                                <TableCell align="right">{user.activated ? "Activated" : "Deactivated"}</TableCell>
                                <TableCell align="right">
                                    <IconButton>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon color="secondary"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CssBaseline>
    )
}