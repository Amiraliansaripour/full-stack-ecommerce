import React, { useEffect, useState } from 'react'
import "./Auth.css"
import { Link, useNavigate,useLocation} from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { authenticate } from '../../auth';
import brownDiagonal from '../../assets/images/brown-diagonal-bars.jpg'
import Layout from '../layout/Layout';
import axios from 'axios';


const Login = () => {
    const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location =useLocation()

    // Login
    const loginApi = async (data) => {
        setLoading(true)
        let { email, password } = data
        let sendData = {
            email,
            password
        }

        await axios.post('http://localhost:8080/api/auth/login', sendData).then((response) => {
            if (response?.data?.result) {
                toast.success(response?.data && response?.data?.message)
                authenticate(response?.data?.data)

                navigate("/")
            } else {
                toast.error(response?.data && response?.data?.message)
            }
            setLoading(false)
        }, (error) => {
            toast.error(error.message)
            setLoading(false)
        })
    }
    // Login


    return (
        <Layout title="ورود | وحید پرفیوم">
            <div className="main-login" style={{ background: `url(${brownDiagonal})` }}>
                <div className="login-con">
                    <form className="login-form" onSubmit={handleSubmit(loginApi)}>
                        <h1 style={{ fontSize: "1.75rem" }} className="login-title">ورود</h1>
                        <label className="login-form__label" htmlFor="email"><span className="sr-only">ایمیل</span>
                            <input type="text"
                                id="email"
                                placeholder="ایمیل"
                                {...register("email", { required: "Please Enter Email" })}
                            />
                        </label>
                        {errors.email && (<small style={{ color: "red" }}>{errors.email.message}</small>)}

                        <label className="login-form__label" htmlFor="psw"><span className="sr-only">رمز عبور</span>
                            <input type="password" id="psw" placeholder="رمز عبور"
                                {...register("password", { required: "Please Enter Password" })}
                            />
                        </label>
                        {errors.password && (<small style={{ color: "red" }}>{errors.password.message}</small>)}

                        <button className="btn" disabled={loading ? true : false} onClick={handleSubmit(loginApi)}>
                            {loading ? <CircularProgress color='inherit' size='1.5rem'  /> : <span>ورود</span>}
                        </button>
                        <div className="login-forget mt-2"><Link className="text-dark" to="/reset">رمز عبور خود را فراموش کرده اید؟</Link><Link className="login-form__link" to="/reset"> بازگردانی</Link></div>
                        <br />
                        <div className="line" style={{ width: '100%', height: '0.5px' }}></div>
                        {/* <button className="btn btn-danger d-flex align-items-center justify-content-center" onClick={signInWithGoogle}><GoogleIcon />Login With Google</button> */}
                        <div className="login-forget mt-2"><Link className="text-dark" to="/register">قبلا ثبت نام کرده اید؟</Link><Link className="login-form__link" to="/register">  ثبت نام</Link></div>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login