import React, { memo, useState } from 'react'
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, CircularProgress } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import UpdateBrand from './UpdateBrand';

const AllBrand = ({ brands, getBrands }) => {
  const [openModal, setOpenModal] = useState(false)
  const [brandId, setBrandId] = useState("")

  // Delete
  const deleteFromList = async (id) => {
    await axios.delete(`http://localhost:8080/api/brand/${id}`).then((response) => {
      getBrands()
      toast.success(response?.data.message)
    }, (err) => {
      toast.error(err.message)
      toast.error(err.response.data.message)
      console.log(err)
    })
  }

  // Update
  const editeModalHandler = async (id) => {
    await setBrandId(id)
    await setOpenModal(true)
  }
  return (
    <>
      {openModal ? <UpdateBrand
        openModal={openModal}
        setOpenModal={setOpenModal}
        brandId={brandId}
        getBrands={getBrands} /> : <></>}
      {
        brands ?
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
                {brands.map((brand) => {
                  return (
                    <TableRow key={brand?._id}>
                      <TableCell>{brand?._id.substring(0, 5)}</TableCell>
                      <TableCell>{brand?.name}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => editeModalHandler(brand?._id)}>
                          <ModeEditOutlineIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => deleteFromList(brand?._id)}>
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

export default memo(AllBrand)