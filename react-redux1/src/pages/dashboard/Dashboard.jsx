import React from 'react'
import Layout from '../layout/Layout'
import UserMenu from './UserMenu'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <Layout title={"پروفایل - وحید پرفیوم"}>
            <div className="row m-3 p-3">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <div className="card w-80 p-3">
                        <h3>{user ? user.name : "دوباره وارد شوید"}</h3>
                        <h3>{user ? user.email : "دوباره وارد شوید"}</h3>
                        <h3>{user ? user.phone : "دوباره وارد شوید"}</h3>
                        <h3>{user ? user.address : "دوباره وارد شوید"}</h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard