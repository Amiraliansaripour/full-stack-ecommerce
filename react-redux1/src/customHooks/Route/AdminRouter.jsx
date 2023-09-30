import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { isAuthenticated } from "../../auth";
import Unauth from "../unAth/Unauth";

export default function AdminRouter() {
    const [ok, setOk] = useState(false)
    const token = JSON.parse(localStorage.getItem("jwt"))


    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:8080/api/auth/admin-auth')

            if (res.data.result) {
                setOk(true)
                localStorage.setItem("ref",JSON.stringify(res.data.result))
            } else {
                setOk(false)
            }
        }

        if (token) authCheck()
    }, [token])



    return ok ? <Outlet /> : <Unauth />;
}