import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const UserMenu = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("user")
        navigate('/')
    }
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>پنل کاربری</h4>
                    <NavLink to="/dashboard/profile"
                        className="list-group-item list-group-item-action">
                        پروفایل
                    </NavLink>
                    <NavLink to="/dashboard/orders"
                        className="list-group-item list-group-item-action">
                        سفارشات
                    </NavLink>
                    <NavLink to="/"
                        className="list-group-item list-group-item-action">
                        <button onClick={logout} className='btn btn-danger'>خروج از حساب</button>
                    </NavLink>
                </div>
                
            </div>
        </>
    )
}

export default UserMenu