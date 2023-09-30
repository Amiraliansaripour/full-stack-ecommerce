import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material'
import Layout from '../../layout/Layout'
import AdminMenu from '../AdminMenu'
import { toast } from 'react-hot-toast'
import AllSmell from './AllSmell'

const CreateSmell = () => {

  const [smells, setMils] = useState([])
  const [name, setname] = useState('')
  const [loading, setLoading] = useState(false)

  // get All List
  const getSmell = async () => {
    await axios.get("http://localhost:8080/api/smell").then((response) => {
      setMils(response?.data.data)
    }, (err) => {
      console.log(err)
    })
  }



  useEffect(() => {
    getSmell()
  }, [])

  // create a new Smell
  const creatSmell = async (e) => {
    e.preventDefault()
    setLoading(true)
    let formData = {
      name,
    }
    axios.post("http://localhost:8080/api/smell", formData).then((response) => {
      setLoading(false)
      toast.success(" رایحه با موفقیت ساخته شد")
      getSmell()
    }, (err) => {
      toast.error(err.message)
      toast.error(err.response.data.message)
      console.log(err)
      setLoading(false)

    })
  }

  return (
    <Layout title={"داشبورد - رایحه"}>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-4 text-center">
            <form dir='rtl' onSubmit={creatSmell} >
              <div className="row my-3 d-flex justify-content-center">
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    variant='filled'
                    placeholder='رایحه'
                    onChange={(e) => setname(e.target.value)}
                  />

                </div>

              </div>


              <div className="row my-3 d-flex align-items-center justify-content-center">
                <Button
                  style={{ width: "50%", backgroundColor: "red" }}
                  variant='contained'
                  type='submit'
                  onClick={creatSmell}
                >

                  {
                    loading ? <CircularProgress /> : "ایجاد رایحه"
                  }

                </Button>
              </div>
            </form>
            <br />
            <br />
            <h3>رایحه ها</h3>
            <AllSmell getSmell={getSmell} smells={smells} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default memo(CreateSmell)