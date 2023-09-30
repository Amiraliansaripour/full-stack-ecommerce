import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from '../AdminMenu'
import axios from 'axios'
import AllProduct from './AllProduct'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./../Admin.css"

import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import { toast } from 'react-hot-toast'
import { numberComma } from '../../../customHooks/SpliteNumber'
import { formatSizeUnits } from '../../../customHooks/formatSize'
const CreateProduct = () => {

    const [products, setProducts] = useState([])
    const [body, setBody] = useState('')
    const [name, setName] = useState('')
    const [enName, setenName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [smell, setSmell] = useState('')
    const [mil, setMil] = useState('')
    const [image, setImage] = useState()
    const [error, setError] = useState('')
    const [category, setCategory] = useState('')
    const [count, setCount] = useState(2)
    const [status,setStatus] = useState(1)
    // loading
    const [loading, setLoading] = useState(false)

    // api state
    const [smells, setSmells] = useState([])
    const [mils, setMils] = useState([])
    const [categories, setCategories] = useState([])


    // get all products
    const getAllProducts = async () => {
        await axios.get("http://localhost:8080/api/product/admin").then((response) => {
            setProducts(response?.data?.data)
        }, (error) => {
            console.log(error)
        })
    }

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
    }, [])





    // Create Product
    const sendProduct = async (e) => {
        e.preventDefault()

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
        console.log(status)

        await axios.post("http://localhost:8080/api/product", formData).then((response) => {
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



    return (
        <Layout title={"داشبورد -  محصولات"}>
            <div className="container m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 p-4 text-center">
                        <form dir='rtl' >
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        placeholder='نام محصول'
                                        onChange={(e) => setName(e.target.value)}
                                    />


                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        id='standard-basic'
                                        fullWidth
                                        variant='filled'
                                        placeholder='نام انگلیسی'
                                        type='text'
                                        onChange={(e) => setenName(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        placeholder='قیمت'
                                        type='number'
                                        onChange={(e) => setPrice(e.target.value)}

                                    />
                                </div>
                                <div className="col-md-6">
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

                            <div className="row my-3">
                                <div className="col-md-12">
                                    <TextareaAutosize
                                        className='description p-2'
                                        minRows={8}
                                        placeholder="توضیحات"
                                        onChange={(e) => setDescription(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <Editor
                                        editorStyle={{ backgroundColor: '#e5e5e5' }}
                                        // toolbar={{
                                        //     image: {
                                        //         uploadEnabled: true,
                                        //         uploadCallback: editorUploadCallback,
                                        //         previewImage: true,
                                        //     }
                                        // }}
                                        editorState={body}
                                        onEditorStateChange={setBody}
                                    />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <FormControl fullWidth>
                                        <InputLabel id='consultant_id_label'>دسته بندی</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setCategory(e.target.value)}

                                        >
                                            {categories.map((category, index) => (
                                                <MenuItem key={index} value={category._id}>{category.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <FormControl fullWidth>
                                        <InputLabel id='consultant_id_label'>رایحه</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setSmell(e.target.value)}

                                        >
                                            {smells.map((smell, index) => (
                                                <MenuItem key={index} value={smell._id}>{smell.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>
                                <div className="col-md-6 mt-2">
                                    <FormControl fullWidth>
                                        <InputLabel id='consultant_id_label'>میلی لیتر</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setMil(e.target.value)}
                                        >
                                            {mils.map((mil, index) => (
                                                <MenuItem key={index} value={mil._id}>{mil.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>
                            </div>

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
                            <div className="row my-3">
                                <div className="col-md-12 d-flex align-items-center justify-content-center">
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
                                    {image ?
                                        <div className='rounded border p-2 mr-1'>
                                            <p>{image.name}</p>
                                            <p>حجم فایل :{`${formatSizeUnits(image.size)}`}</p>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>

                            </div>
                            {error ? <div className="alert alert-danger" role="alert">
                                {error}
                            </div> : <></>}
                            <div className="row my-3 d-flex align-items-center justify-content-center">
                                <Button
                                    style={{ width: "50%" }}
                                    variant='contained'
                                    type='submit'
                                    onClick={sendProduct}
                                >

                                    {
                                        loading ? <CircularProgress /> : "ایجاد محصول"
                                    }

                                </Button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <h3>همه محصولات</h3>
                        <AllProduct getAllProducts={getAllProducts} products={products} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct