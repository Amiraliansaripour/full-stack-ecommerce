import React, { memo, useEffect, useState } from 'react'
import AllMil from './AllMil'
import axios from 'axios'
import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import Layout from '../../layout/Layout'
import AdminMenu from '../AdminMenu'
import { toast } from 'react-hot-toast'


const CreateMil = () => {
    const [mils, setMils] = useState([])
    const [name, setname] = useState('')
    const [loading, setLoading] = useState(false)

    // get All List
    const getMils = async () => {
        await axios.get("http://localhost:8080/api/mil").then((response) => {
            setMils(response?.data.data)
        }, (err) => {
            console.log(err)
        })
    }



    useEffect(() => {
        getMils()
    }, [])

    const createMil = async (e) => {
        e.preventDefault()
        setLoading(true)
        let formData = {
            name,
        }
        axios.post("http://localhost:8080/api/mil", formData).then((response) => {
            setLoading(false)
            toast.success("میلی لیتر با موفقیت ساخته شد")
            getMils()
        }, (err) => {
            toast.error(err.message)
            toast.error(err.response.data.message)
            console.log(err)
            setLoading(false)

        })
    }
    return (
        <Layout title={"داشبورد -  میلی لیتر"}>
            <div className="container m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 p-4 text-center">
                        <form dir='rtl' onSubmit={createMil} >
                            <div className="row my-3 d-flex justify-content-center">
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        placeholder='مقدار میلی لیتر'
                                        onChange={(e)=> setname(e.target.value)}
                                    />

                                </div>

                            </div>


                            <div className="row my-3 d-flex align-items-center justify-content-center">
                                <Button
                                    style={{ width: "50%", backgroundColor: "red" }}
                                    variant='contained'
                                    type='submit'
                                    onClick={createMil}
                                >

                                    {
                                        loading ? <CircularProgress  /> : "ایجاد میلی لیتر"
                                    }

                                </Button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <h3>میلی لیتر ها</h3>
                        <AllMil getMils={getMils} mils={mils} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default memo(CreateMil)