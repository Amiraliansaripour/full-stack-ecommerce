import React, { useState } from 'react'
import { Table, TableContainer, TableCell, TableRow, TableHead, Paper, TableBody, IconButton, CircularProgress } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'jalali-moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { numberComma } from '../../../customHooks/SpliteNumber';
import "../Admin.css"
import UpdateProduct from './UpdateProduct';

const AllProduct = ({ products, getAllProducts }) => {

    const [openModal, setOpenModal] = useState(false)
    const [product, setProduct] = useState()
    /* Delete Product */
    const deleteProduct = async (id) => {

        await axios.delete(`http://localhost:8080/api/product/${id}`).then((response) => {

            toast.success(response.data.message)
            /* Refresh List */
            getAllProducts();
            /* Refresh List */

        }, (error) => {

            /* Show Error Message */
            toast.error(error.message);
            toast.error(error.response.data.message)
            /* Show Error Message */

        });
    }
    /* Delete Product */

    // update product
    const updateHandler = (product) => {
        setOpenModal(true)
        setProduct(product)
    }
    // update product
    return (
        <>
            {
                openModal ? <UpdateProduct
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getAllProducts={getAllProducts}
                    product={product} /> : <></>
            }
            {
                products ?
                    <TableContainer component={Paper}>
                        <Table id="myTable"
                            className="display">
                            <TableHead>
                                <TableRow>
                                    <TableCell >کد</TableCell>
                                    <TableCell >نام فارسی</TableCell>
                                    <TableCell >نام</TableCell>
                                    <TableCell >وضعیت</TableCell>
                                    <TableCell >تصویر</TableCell>
                                    <TableCell >قیمت</TableCell>
                                    <TableCell >دسته بندی</TableCell>
                                    <TableCell >رایحه</TableCell>
                                    <TableCell >میل</TableCell>
                                    <TableCell >تاریخ ساخت</TableCell>
                                    <TableCell >تاریخ آپدیت</TableCell>
                                    <TableCell >موجودی</TableCell>
                                    <TableCell >ویرایش</TableCell>
                                    <TableCell >حذف</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => {
                                    return (
                                        <TableRow key={product._id} style={{ height: '120px', fontFamily: 'Vazirmatn' }}>
                                            <TableCell>{product?._id.substring(0, 5)}</TableCell>
                                            <TableCell>{product.name ? product.name : "وارد نشده"}</TableCell>
                                            <TableCell>{product.enName ? product.enName : "وارد نشده"}</TableCell>
                                            <TableCell>{product.status === 1 ? <p className='status-active'>فعال</p> : <p className='status-deactive'>غیرفعال</p>}</TableCell>
                                            <TableCell>
                                                <LazyLoadImage src={`http://localhost:8080/${product?.thumb}`} effect="blur" style={{ width: "80px", borderRadius: "10px" }} /></TableCell>
                                            <TableCell>{product.price ? numberComma(product.price) : "وارد نشده"}</TableCell>
                                            <TableCell>{product.category ? product?.category?.name : "وارد نشده"}</TableCell>
                                            <TableCell>{product.smell ? product?.smell?.name : "وارد نشده"}</TableCell>
                                            <TableCell>{product.mil ? product?.mil?.name : "وارد نشده"}</TableCell>
                                            <TableCell>{moment(product.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</TableCell>
                                            <TableCell>{moment(product.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</TableCell>
                                            <TableCell>{product.count}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => updateHandler(product)}>
                                                    <ModeEditOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => deleteProduct(product?._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </TableContainer>
                    : <CircularProgress />
            }
        </>
    )
}

export default AllProduct