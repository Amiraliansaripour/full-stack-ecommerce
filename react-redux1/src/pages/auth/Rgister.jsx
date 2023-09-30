import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';
// import { toast } from 'react-toastify';
import brownDiagonal from '../../assets/images/brown-diagonal-bars.jpg'
import Layout from '../layout/Layout';
import axios from 'axios'
import { authenticate } from '../../auth';
import toast from 'react-hot-toast';

const Rgister = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        let { email, name, phone, address, password } = data;
        let sendData = {
            email,
            name,
            phone,
            address,
            password,
        }
        setLoading(true)
       await axios.post('http://localhost:8080/api/auth/register', sendData).then((response) => {
            if (response?.data?.result) {
                toast.success(response?.data?.message)
                authenticate(response?.data?.data)
                navigate("/")
            }else{
                toast.warning(response?.data?.message)
            }
            setLoading(false)
        }, (error) => {
            setLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage + " " + errorCode)
            console.log(error)
        })


    }

    return (
        <Layout title="ثبت نام | وحید پرفیوم">
            <div className="main-login" style={{ background: `url(${brownDiagonal})` }}>
                <div className="login-con">
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 style={{ fontSize: "1.75rem" }} className="login-title">ثبت نام</h1>
                        <br />
                        <label className="login-form__label" htmlFor="email"><span className="sr-only">ایمیل*</span>
                            <input
                                {...register("email", { required: "لطفا ایمیل را وارد کنید" })}
                                type="email" id="email"
                                placeholder="ایمیل"
                                onKeyUp={() => {
                                    trigger("email")
                                }} />
                        </label>

                        <label className="login-form__label" htmlFor="phone"><span className="sr-only">شماره همراه*</span>
                            <input
                                {...register("phone", { required: "لطفا شماره را وارد کنید" })}
                                type="email" id="phone"
                                placeholder="شماره همراه"
                                onKeyUp={() => {
                                    trigger("phone")
                                }} />
                        </label>

                        <label className="login-form__label" htmlFor="uname"><span className="sr-only">نام کاربری*</span>
                            <input type="text"
                                {...register("name", { required: "نام کاربری را وارد کنید" })}
                                id="name"
                                placeholder="نام کاربری"

                                onKeyUp={() => {
                                    trigger("name")
                                }} />
                        </label>

                        <label className="login-form__label" htmlFor="psw"><span className="sr-only">رمزعبور*</span>
                            <input type="password"
                                {...register("password", {
                                    required: "لطفا رمز عبور را واردکنید",
                                    minLength: {
                                        value: 8,
                                        message: "رمز عبور شما باید بیش از 8 کاراکتر باشد"
                                    },
                                })}
                                id="psw"
                                placeholder="رمز عبور"

                                onKeyUp={() => {
                                    trigger("password")
                                }} />
                        </label>

                        <label className="login-form__label" htmlFor="address"><span className="sr-only">آدرس*</span>
                            <textarea type="text"
                                {...register("address", {
                                    required: "لطفا آدرس را وارد کنید",
                                    minLength: {
                                        value: 8,
                                        message: "آدرس شما باید بیش از 8 کاراکتر باشد"
                                    },
                                })}
                                id="address"

                                onKeyUp={() => {
                                    trigger("address")
                                }}> </textarea>
                        </label>
                        {errors.address && (<small style={{ color: "red" }}>{errors.address.message}</small>)}
                        {errors.password && (<small style={{ color: "red" }}>{errors.password.message}</small>)}
                        {errors.name && (<small style={{ color: "red" }}>{errors.name.message}</small>)}
                        {errors.email && (<small style={{ color: "red" }}>{errors.email.message}</small>)}
                        {errors.phone && (<small style={{ color: "red" }}>{errors.phone.message}</small>)}




                        <br />
                        <button className="btn" type="submit" disabled={loading ? true : false} onClick={handleSubmit(onSubmit)}>
                            {loading ? <CircularProgress color='inherit' size='1.5rem' /> : <span>ثبت نام</span>}
                        </button>

                        <div className="login-forget mt-2"><Link className="text-dark" to="/login">آیا شما یک حساب دارید؟</Link><Link className="login-form__link" to="/login"> ورود</Link></div>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Rgister