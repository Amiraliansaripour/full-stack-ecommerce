import React, { memo, useEffect, useState } from 'react'
import AllImage from './AllImage'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import AdminMenu from '../AdminMenu'
import Layout from '../../layout/Layout'
import { formatSizeUnits } from '../../../customHooks/formatSize'


const UploadImage = () => {
    const [products, setProducts] = useState([])
    const [image, setImage] = useState()
    const [productId, setProductId] = useState("")
    const [Perror, setPError] = ("")
    const [imageError, setImageError] = ("")
    const [loading, setLoading] = useState(false)
    // get all products
    const getAllProducts = async () => {
        await axios.get("http://localhost:8080/api/product/admin?count=5").then((response) => {
            setProducts(response?.data?.data)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const uploadImage = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!productId) {
            setLoading(false)
            return setPError("محصول را انتخاب کنید")
        } else if (!image) {
            setLoading(false)
            return setImageError("عکس محصول را انتخاب کنید")
        }

        let formData = new FormData()
        formData.append("image", image)
        formData.append("product_id", productId)

        await axios.post("http://localhost:8080/api/image/upload", formData).then((response) => {
            setLoading(false)
            toast.success(response?.data?.message)
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
            setLoading(false)

        })
    }




    return (
        <Layout title={"داشبورد - ایجاد عکس"}>
            <div className="container m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 p-4 text-center">
                        <form dir='rtl' onSubmit={uploadImage} >
                            <div className="row my-3 d-flex justify-content-center">
                                <div className="col-md-12">
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
                                                <p>حجم فایل :{`${formatSizeUnits(image.size)}kb`}</p>
                                            </div>
                                            :
                                            <></>
                                        }
                                        {imageError ? <span style={{ color: 'red' }}>{imageError}</span> : <></>}
                                    </div>

                                </div>

                                <div className="col-md-12 d-flex align-items-center justify-content-center mt-2">
                                    <FormControl style={{ direction: "rtl", width: "50%" }}>
                                        <InputLabel

                                            id='consultant_id_label'>محصول</InputLabel>
                                        <Select
                                            label='consultant_id_label'
                                            id='consultant_id'
                                            onChange={(e) => setProductId(e.target.value)}

                                        >
                                            {products.map(product => (
                                                <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>

                            </div>


                            <div className="row my-3 d-flex align-items-center justify-content-center">
                                <Button
                                    style={{ width: "50%" }}

                                    variant='contained'
                                    type='submit'
                                    onClick={uploadImage}
                                >

                                    {
                                        loading ? <CircularProgress /> : "ثبت  نهایی"
                                    }

                                </Button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <h3>تصاویر</h3>
                        {/* <AllImage getMils={getMils} mils={mils} /> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default memo(UploadImage)