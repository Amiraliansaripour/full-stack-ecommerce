import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import brownDiagonal from '../../assets/images/brown-diagonal-bars.jpg'
import Layout from '../layout/Layout';



const Reset = () => {
    const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
    const [loading , setLoading] = useState(false)
    const resetPass = (data) => {
        // setLoading(true)

        // sendPasswordResetEmail(auth,data.email)
        // .then(()=>{
        //     toast.success("Check Your Email for Reset Link ...")
        //     setLoading(false)
        // })
        // .catch((error)=>{
        //     toast.error(error.message)
        //     setLoading(false)
        // })

    }
    return (
        <Layout title=" فراموشی رمز | وحید پرفیوم">
            <div className="main-login" style={{background:`url(${brownDiagonal})`}}>
                <div className="login-con">
                    <form className="login-form" onSubmit={handleSubmit(resetPass)}>
                        <h3 className="login-title">Reset Password</h3>
                        <label className="login-form__label" htmlFor="uname"><span className="sr-only">Email</span>
                            <input className="login-form__input"
                                {...register("email", {
                                    required: "Please Enter Email", pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: "Email not Valid"
                                    }
                                })}
                                type="email"
                                id="uname" placeholder="Email" />
                        </label>
                        {errors.email && (<small style={{ color: "red" }}>{errors.email.message}</small>)}


                        <button className="btn" onClick={handleSubmit(resetPass)}>
                            {loading ? <CircularProgress /> : <span>Reset Password</span>}
                           
                            </button>
                        <br />
                        <div className="login-forget mt-2"><Link className="text-dark" to="/register">Register</Link><Link className="login-form__link" to="/register">Sign Up</Link></div>

                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Reset