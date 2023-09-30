import React, { memo, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import "./product.css"
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    borderRadius: '10px',
    boxShadow: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 4,
};

const UpdateProduct = ({ openModal, setOpenModal, product, getAllProducts }) => {
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [smells, setSmells] = useState([])
    const [mils, setMils] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    // data
    const [name, setName] = useState('')
    const [enName, setenName] = useState('')
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')
    const [smell, setSmell] = useState('')
    const [mil, setMil] = useState('')
    const [category, setCategory] = useState('')
    const [count, setCount] = useState(product?.count)
    const [price, setPrice] = useState(product?.price)
    const [status, setStatus] = useState(1)



    // get All Smell
    const getAllSmell = async () => {
        await axios.get("http://localhost:8080/api/smell").then((response) => {
            setSmells(response?.data.data)
        }, (error) => {
            console.log(error)
        })
    }


    // get All mil
    const getAllMil = async () => {
        await axios.get("http://localhost:8080/api/mil").then((response) => {
            setMils(response?.data.data)
        }, (error) => {
            console.log(error)
        })
    }

    // get All cate
    const getAllCategory = async () => {
        await axios.get("http://localhost:8080/api/category").then((response) => {
            setCategories(response?.data.data)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllProducts()
        getAllSmell()
        getAllMil()
        getAllCategory()

        // set state
        setName(product?.name)
        setenName(product?.enName)
        setImage(product?.thumb)
        setDescription(product?.description)
        setSmell(product?.smell?._id)
        setMil(product?.mil?._id)
        setCategory(product?.category?._id)
        setCount(product?.count)
        setPrice(product?.price)

    }, [])

    // is active status 
    const isActiveProduct = (e) => {
        console.log(e.target.checked)
        if (e.target.checked === true) {
            setStatus(1)
        } else {
            setStatus(0)
        }

    }
    // is active status 



    const updateProduct = async (e) => {
        e.preventDefault()
        let data = {
            name,
            enName,
            image,
            description,
            smell,
            mil,
            category,
            count,
            price,
            status,

        }

        setLoading(true)

        if (!name) {
            setLoading(false)
            return setError("نام محصول را وارد کنید")
        } else if (!enName) {
            setLoading(false)
            return setError("اسم انگلیسی را وارد کنید")
        }
        else if (!price) {
            setLoading(false)
            return setError("قیمت را وارد کنید !")
        }
        else if (!description) {
            setLoading(false)
            return setError("عکس محصول را انتخاب کنید")
        }
        else if (!smell) {
            setLoading(false)
            return setError("رایحه را انتخاب کنید")
        }
        else if (!mil) {
            setLoading(false)
            return setError("میلی لیتر را انتخاب کنید")
        }
        else if (!count) {
            setLoading(false)
            return setError("تعداد را انتخاب کنید")
        }
        else if (!category) {
            setLoading(false)
            return setError("تعداد را انتخاب کنید")
        }


        let formData = new FormData()
        formData.append("name", name)
        formData.append("enName", enName)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("smell", smell)
        formData.append("mil", mil)
        formData.append("image", image)
        formData.append("count", count)
        formData.append("status", status)
        
        await axios.put(`http://localhost:8080/api/product/${product?._id}`, formData).then((response) => {
            setLoading(false)
            toast.success(response?.data?.message)
            if (response?.data?.result) {
                getAllProducts()
            }
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
            setLoading(false)

        })
    }

    return (
        <>
            {loading ? <CircularProgress /> :
                <div>
                    <Button onClick={handleOpen}>دسته بندی</Button>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="productt-card p-1">


                                <img style={{
                                    width: "80px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    justifySelf: "center"
                                }} src={`http://localhost:8080/${product?.thumb}`} className="p-image" alt={product?.name} />
                                <br />
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    عکس محصول
                                    <input
                                        type="file"
                                        accept='image/*'
                                        hidden
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </Button>


                                <div className="product-content">
                                    <div className="product-title">
                                        <div className="row my-3">
                                            <div className="col-md-12 mt-2">
                                                <TextField
                                                    fullWidth
                                                    variant='filled'
                                                    placeholder={`نام قبلی (${product?.name})`}
                                                    defaultValue={product?.name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />


                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <TextField
                                                    id='standard-basic'
                                                    fullWidth
                                                    variant='filled'
                                                    placeholder={`نام انگلیسی قبلی (${product?.enName})`}
                                                    defaultValue={product?.enName}
                                                    type='text'
                                                    onChange={(e) => setenName(e.target.value)}

                                                />
                                            </div>
                                        </div>

                                        <div className="row my-3">
                                            <div className="col-md-12">
                                                <TextField
                                                    fullWidth
                                                    variant='filled'
                                                    placeholder='قیمت'
                                                    type='number'
                                                    defaultValue={product?.price}
                                                    onChange={(e) => setPrice(e.target.value)}

                                                />
                                            </div>
                                        </div>

                                        <div className="row my-3">
                                            <div className="col-md-12">
                                                <TextareaAutosize
                                                    className='description p-2'
                                                    minRows={3}
                                                    placeholder="توضیحات"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    defaultValue={product?.description}
                                                />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-md-12">
                                                <TextField
                                                    fullWidth
                                                    variant='filled'
                                                    placeholder='تعداد'
                                                    type='number'
                                                    defaultValue={count}
                                                    onChange={(e) => setCount(e.target.value)}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="product-mill mt-2">

                                        <InputLabel id='consultant_id_label'>دسته بندی</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setCategory(e.target.value)}
                                            defaultValue={product?.category?._id}

                                        >
                                            {categories.map((category, index) => (
                                                <MenuItem key={index} value={category._id}>{category.name}</MenuItem>
                                            ))}
                                        </Select>

                                        <br />

                                        <InputLabel id='consultant_id_label'>میلی لیتر</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setMil(e.target.value)}
                                            defaultValue={product?.mil?._id}
                                            fullWidth={true}
                                        >
                                            {mils.map((mil, index) => (
                                                <MenuItem key={index} value={mil._id}>{mil.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <br />
                                        <InputLabel id='consultant_id_label'>رایحه</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setSmell(e.target.value)}
                                            defaultValue={product?.smell?._id}
                                            fullWidth={true}
                                        >
                                            {smells.map((smell, index) => (
                                                <MenuItem key={index} value={smell._id}>{smell.name}</MenuItem>
                                            ))}
                                        </Select>

                                        <div className="row my-3">
                                            <div className="col-md-4">
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={isActiveProduct} />}
                                                        checked={status}
                                                        label="وضعیت" />
                                                </FormGroup>
                                            </div>

                                        </div>

                                        <Button
                                            style={{ width: "100%" }}
                                            variant='contained'
                                            type='submit'
                                            onClick={updateProduct}>
                                            {
                                                loading ? <CircularProgress /> : "ویرایش محصول"
                                            }
                                        </Button>

                                    </div>
                                </div>

                            </div>
                        </Box>
                    </Modal>
                </div>}
        </>
    );
}

export default memo(UpdateProduct)