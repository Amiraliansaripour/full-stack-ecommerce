import React, { memo, useState } from 'react'
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, CircularProgress } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import UpdateSmell from './UpdateSmell';

const AllSmell = ({ smells, getSmell }) => {
    const [openModal, setOpenModal] = useState(false)
    const [smellId, setSmellId] = useState("")

    // Delete
    const deleteFromList = async (id) => {
        await axios.delete(`http://localhost:8080/api/smell/${id}`).then((response) => {
            getSmell()
            toast.success(response?.data.message)
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
        })
    }

    // Update
    const editeModalHandler = async (id) => {
        await setSmellId(id)
        await setOpenModal(true)
    }

    return (
        <>
            {openModal ? <UpdateSmell
                openModal={openModal}
                setOpenModal={setOpenModal}
                smellId={smellId}
                getSmell={getSmell} /> : <></>}
            {
                smells ?
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
                                {smells.map((smell) => {
                                    return (
                                        <TableRow key={smell?._id}>
                                            <TableCell>{smell?._id.substring(0, 5)}</TableCell>
                                            <TableCell>{smell?.name}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => editeModalHandler(smell?._id)}>
                                                    <ModeEditOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => deleteFromList(smell?._id)}>
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

export default memo(AllSmell)