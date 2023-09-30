import { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Unauth from "../unAth/Unauth";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const token = JSON.parse(localStorage.getItem("jwt"))


    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('http://localhost:8080/api/auth/user-auth')

            if (res.data.result) {
                setOk(res.data.result)
            } else {
                setOk(false)
            }
        }

        if (token) authCheck()
    }, [token])



    return ok ? <Outlet /> : <Unauth />;
}