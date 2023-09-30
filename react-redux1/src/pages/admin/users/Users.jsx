import React, { memo, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from '../AdminMenu'
import axios from 'axios'
import AllUsers from './AllUsers'

const Users = () => {
  const [users, setUsers] = useState([])


  // get All List
  const getUsers = async () => {
    await axios.get("http://localhost:8080/api/auth/users").then((response) => {
      setUsers(response?.data.data)
    }, (err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout title={"داشبورد - همه کاربران"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>همه کاربران</h3>
            <br />
            <AllUsers users={users} getUsers={getUsers} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default memo(Users)