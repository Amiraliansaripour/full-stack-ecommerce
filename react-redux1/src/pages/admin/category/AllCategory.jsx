import React, { memo, useState } from 'react'
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, CircularProgress } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import UpdateCategory from './UpdateCategory';

const AllCategory = ({getCategories , categories}) => {
    const [openModal, setOpenModal] = useState(false)
    const [catId, setCatId] = useState("")

    // Delete
    const deleteFromList = async (id) => {
        await axios.delete(`http://localhost:8080/api/category/${id}`).then((response) => {
            getCategories()
            toast.success(response?.data.message)
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
        })
    }

    // Update
    const editeModalHandler = async (id) => {
        await setCatId(id)
        await setOpenModal(true)
    }
    return (
        <>
            {openModal ? <UpdateCategory
                openModal={openModal}
                setOpenModal={setOpenModal}
                catId={catId}
                getCategories={getCategories} /> : <></>}
            {
                categories ?
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
                                {categories.map((category) => {
                                    return (
                                        <TableRow key={category?._id}>
                                            <TableCell>{category?._id.substring(0, 5)}</TableCell>
                                            <TableCell>{category?.name}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => editeModalHandler(category?._id)}>
                                                    <ModeEditOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => deleteFromList(category?._id)}>
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

export default memo(AllCategory)