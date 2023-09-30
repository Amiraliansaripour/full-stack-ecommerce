import React, { useState } from 'react'
import './Guarantee.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import Groups3Icon from '@mui/icons-material/Groups3';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Guarantee = () => {

    const [guarantee, setGuarantee] = useState([
        {
            id: 1,
            title: "ضمانت کالا",
            dec: "ضمانت تست و اصالت عطر تا 7 روز ",
            icon: <WorkspacePremiumIcon />
        },
        {
            id: 2,
            title: "سفارشی",
            dec: "سفارشی سازی باکس سفارش شما",
            icon: <StorefrontIcon />
        },
        {
            id: 3,
            title: "ترکیب",
            dec: "ساخت ترکیب رایحه های انتخابی شما",
            icon: <WorkspacePremiumIcon />
        },
        {
            id: 4,
            title: "تیم مجرب",
            dec: "تیم وحید پرفیوم پاسخگویه درخواست های شما",
            icon: <Groups3Icon />
        },
    ])

    return (
        <div className='container guarantee'>
            <div className="row d-flex align-items-center justify-content-center" style={{ width: '100%' }}>
                {
                    guarantee.slice(0, 2).map((item) => (
                        <div
                            className="gurantee-card m-2"
                            data-aos="fade-up"
                            key={item.id}>
                            {item.icon}
                            <h4>{item.title}</h4>
                            <p>{item.dec}</p>
                        </div>
                    ))
                }
                {
                    guarantee.slice(2, 4).map((item) => (
                        <div
                            className="gurantee-card m-2"
                            data-aos="fade-up"
                            key={item.id}>
                            {item.icon}
                            <h4>{item.title}</h4>
                            <p>{item.dec}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Guarantee