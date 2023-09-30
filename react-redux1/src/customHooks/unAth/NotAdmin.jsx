import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './Unauth.css'
import Layout from '../../pages/layout/Layout';
import { Link, useNavigate,useLocation} from 'react-router-dom';

const Unauth = () => {
    const[count , setCount] =useState(10)
    const navigate =useNavigate()
    const location =useLocation()
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevVal) => --prevVal);
        
        },1000)
        count === 0 && navigate('/login',{
            state : location.pathname
        });

        return () => clearInterval(interval)
    },[count,location])
    return (
        <Layout>
            <div className='unauth'>
                <div>
                    <i className="uil uil-keyhole-circle"></i>
                    <h3>َشما ادمین نیستید</h3>
                    <p>لطفا با اکانت ادمین وارد سایت شوید</p>
                    <Link to="/login" className='prim-btn'>ورود به حساب کاربری</Link>
                    <br />
                    <p style={{fontSize:"14px"}}>انتقال اتومات شما به صفحه ورود تا {count}  ثانیه دیگر</p>
                </div>
            </div>
        </Layout>
    )
}

export default Unauth