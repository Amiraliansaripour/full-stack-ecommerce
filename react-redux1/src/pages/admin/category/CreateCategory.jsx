import React, { memo, useEffect, useState } from 'react'
import AdminMenu from '../AdminMenu'
import Layout from '../../layout/Layout'
import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import AllCategory from './AllCategory'


const CreateCategory = () => {

    const [categories, setCategories] = useState([])
    const [name, setname] = useState('')
    const [loading, setLoading] = useState(false)

    // get All List
    const getCategories = async () => {
        await axios.get("http://localhost:8080/api/category").then((response) => {
            setCategories(response?.data.data)
        }, (err) => {
            console.log(err)
        })
    }



    useEffect(() => {
        getCategories()
    }, [])

    const createCategory = async (e) => {
        e.preventDefault()
        setLoading(true)
        let formData = {
            name,
        }
        axios.post("http://localhost:8080/api/category", formData).then((response) => {
            setLoading(false)
            toast.success("میلی لیتر با موفقیت ساخته شد")
            getCategories()
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
            setLoading(false)

        })
    }
        return (
            <Layout title={"داشبورد - دسته بندی "}>
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 p-4 text-center">
                            <form dir='rtl' onSubmit={createCategory} >
                                <div className="row my-3 d-flex justify-content-center">
                                    <div className="col-md-6">
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            placeholder='نام دسته بندی'
                                            onChange={(e) => setname(e.target.value)}
                                        />

                                    </div>

                                </div>


                                <div className="row my-3 d-flex align-items-center justify-content-center">
                                    <Button
                                        style={{ width: "50%", backgroundColor: "red" }}
                                        variant='contained'
                                        type='submit'
                                        onClick={createCategory}
                                    >

                                        {
                                            loading ? <CircularProgress /> : "ایجاد دسته بندی"
                                        }

                                    </Button>
                                </div>
                            </form>
                            <br />
                            <br />
                            <h3>دسته بندی</h3>
                            <AllCategory getCategories={getCategories} categories={categories} />
                        </div>
                    </div>
                </div>

            </Layout>
        )
    }

    export default memo(CreateCategory)