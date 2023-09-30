import React from 'react'
import Layout from '../layout/Layout'
import UserMenu from './UserMenu'

const Profile = () => {
    return (
        <Layout>
            <div className="container-fluid m-3 p3">
                <div className="row">
                    <div className="row-revers">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <h1>Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile