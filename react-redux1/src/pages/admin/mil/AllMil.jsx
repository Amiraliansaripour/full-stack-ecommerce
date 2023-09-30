import React, { memo, useState } from 'react'
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, CircularProgress } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import UpdateMil from './UpdateMil';

const AllMil = ({ mils, getMils }) => {
    const [openModal, setOpenModal] = useState(false)
    const [milId, setMilId] = useState("")

    // Delete
    const deleteFromList = async (id) => {
        await axios.delete(`http://localhost:8080/api/mil/${id}`).then((response) => {
            getMils()
            toast.success(response?.data.message)
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
        })
    }

    // Update
    const editeModalHandler = async (id) => {
        await setMilId(id)
        await setOpenModal(true)
    }
    return (
        <>
            {openModal ? <UpdateMil
                openModal={openModal}
                setOpenModal={setOpenModal}
                milId={milId}
                getMils={getMils} /> : <></>}
            {
                mils ?
                    <TableContainer component={Paper}>
                        <Table id="myTable"
                            className="display">
                            <TableHead>
                                <TableRow>
                                    <TableCell >کد</TableCell>
                                    <TableCell >نام</TableCell>
                                    <TableCell >ویرایش</TableCell>
                                    <TableCell >حذف</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mils.map((mil) => {
                                    return (
                                        <TableRow key={mil?._id}>
                                            <TableCell>{mil?._id.substring(0, 5)}</TableCell>
                                            <TableCell>{mil?.name}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => editeModalHandler(mil?._id)}>
                                                    <ModeEditOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => deleteFromList(mil?._id)}>
                                                    <DeleteIcon />
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

export default memo(AllMil)