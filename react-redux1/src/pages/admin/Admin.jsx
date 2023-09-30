import React from 'react'
import Layout from '../layout/Layout'
import "./Admin.css"
import AdminMenu from './AdminMenu'
import { isAuthenticated } from '../../auth'

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <Layout>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card pl-2">
            <h3>{user ? user?.name : "دوباره وارد شوید"}</h3>
            <h3>{user ? user?.email : "دوباره وارد شوید"}</h3>
            <h3>{user ? user?.phone : "دوباره وارد شوید"}</h3>

            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default Admin