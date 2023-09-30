import React, { memo, useState } from 'react'
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, CircularProgress, Modal, Box, Button } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import moment from 'jalali-moment';

const AllUsers = ({ users, getUsers }) => {
    const [userId, setUserId] = useState()
    const [userModal, setUserModal] = useState(false)
    // Update

    const openUserModal = (user) => {
        setUserModal(true)
        setUserId(user)
    }

    const editeModalHandler = () => {

    }
    return (
        <>
            {
                userModal
                    ?
                    <UserDetails
                        userModal={userModal}
                        setUserModal={setUserModal}
                        user={userId}
                    />
                    : <></>
            }
            {
                users ?
                    <TableContainer component={Paper}>
                        <Table id="myTable"
                            className="display">
                            <TableHead>
                                <TableRow>
                                    <TableCell >کد</TableCell>
                                    <TableCell >نام</TableCell>
                                    <TableCell >شماره تلفن</TableCell>
                                    <TableCell >تاریخ عضویت</TableCell>
                                    <TableCell >ویرایش</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => {
                                    return (
                                        <TableRow key={user?._id} onClick={() => openUserModal(user)}>
                                            <TableCell>{user?._id.substring(0, 5)}</TableCell>
                                            <TableCell>{user?.name}</TableCell>
                                            <TableCell>{user?.phone}</TableCell>
                                            <TableCell >{moment(user.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => editeModalHandler(user?._id)}>
                                                    <ModeEditOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </TableContainer>

                    :
                    <CircularProgress />
            }
        </>
    )
}

export default memo(AllUsers)


// Modal component
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const UserDetails = ({ user, setUserModal, userModal }) => {
    const handleOpen = () => setUserModal(true);
    const handleClose = () => setUserModal(false);

    return (
        <>
            {user ?
                <div>
                    <Button onClick={handleOpen}>کاربر</Button>
                    <Modal
                        open={userModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <h3>{user.name}</h3>
                                <br />
                                <h4>{user.phone}</h4>
                                <br />
                                <span>: آدرس</span> <h5>{user.address}</h5>
                                <br />
                                <span>: کد پستی</span> <h5>{user.postal_code ? user.postal_code : "وارد نشده"}</h5>
                                <br />

                                <button 
                                className='btn btn-danger'
                                onClick={handleClose}
                                >بستن</button>
                            </div>
                        </Box>
                    </Modal>
                </div> : <CircularProgress />
            }
        </>
    )

}