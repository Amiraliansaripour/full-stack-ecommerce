import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import Layout from '../../layout/Layout'
import AdminMenu from '../AdminMenu'
import { toast } from 'react-hot-toast'
import AllBrand from './AllBrand'


const CreateBrand = () => {
    const [brands, setBrands] = useState([])
    const [name, setname] = useState('')
    const [loading, setLoading] = useState(false)

    // get All List
    const getBrands = async () => {
        await axios.get("http://localhost:8080/api/brand").then((response) => {
            setBrands(response?.data.data)
        }, (err) => {
            console.log(err)
        })
    }



    useEffect(() => {
        getBrands()
    }, [])

    const createBrand = async (e) => {
        e.preventDefault()
        setLoading(true)
        let formData = {
            name,
        }
        axios.post("http://localhost:8080/api/brand", formData).then((response) => {
            setLoading(false)
            toast.success("برند با موفقیت ساخته شد")
            setname('')
            getBrands()
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
            setLoading(false)

        })
    }
    return (
        <Layout title={"داشبورد - برند"}>
            <div className="container m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 p-4 text-center">
                        <form dir='rtl' onSubmit={createBrand} >
                            <div className="row my-3 d-flex justify-content-center">
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        placeholder='نام برند'
                                        onChange={(e)=> setname(e.target.value)}
                                    />

                                </div>

                            </div>


                            <div className="row my-3 d-flex align-items-center justify-content-center">
                                <Button
                                    style={{ width: "50%", backgroundColor: "red" }}
                                    variant='contained'
                                    type='submit'
                                    onClick={createBrand}
                                >

                                    {
                                        loading ? <CircularProgress  /> : "ایجاد برند"
                                    }

                                </Button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <h3>برند     ها</h3>
                        <AllBrand getBrands={getBrands} brands={brands} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default memo(CreateBrand)