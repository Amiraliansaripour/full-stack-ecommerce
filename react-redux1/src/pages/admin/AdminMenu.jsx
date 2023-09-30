import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>پنل مدیریت</h4>
                    <NavLink to="/admin/create-category"
                        className="list-group-item list-group-item-action">
                        ساخت دسته بندی
                    </NavLink>
                    <NavLink to="/admin/create-product"
                        className="list-group-item list-group-item-action">
                        ساخت محصول
                    </NavLink>
                    <NavLink to="/admin/users"
                        className="list-group-item list-group-item-action">
                        کاربران
                    </NavLink>
                    <NavLink to="/admin/mil"
                        className="list-group-item list-group-item-action">
                        ساخت میلی لیتر
                    </NavLink>
                    <NavLink to="/admin/smell"
                        className="list-group-item list-group-item-action">
                        ساخت رایحه
                    </NavLink>
                    <NavLink to="/admin/gallery"
                        className="list-group-item list-group-item-action">
                         ایجاد گالری
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu