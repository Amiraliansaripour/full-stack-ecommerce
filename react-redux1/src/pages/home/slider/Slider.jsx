import React from 'react'
import './Slider.css'
import bottleTransparent from '../../../assets/images/slider/bottle1.webp'
import waveSvg from '../../../assets/svg/blob-haikei.svg'
import blobeSvg from '../../../assets/svg/blob-haikei2.svg'
import { Link } from 'react-router-dom'

const Slider = () => {

    return (
        <div className='introduction'>
            <img src={blobeSvg} className='wave' alt="وحید پرفیوم" />

            <div className='ripple-background'>
                <div className='circle xxlarge shade1'></div>
                <div className='circle xlarge shade2'></div>
                <div className='circle large shade3'></div>
                <div className='circle mediun shade4'></div>
                <div className='circle small shade5'></div>

                <div className="container">
                    <div className="row" style={{ height: '100%' }}>
                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center introduction-image">
                            <div className='intro-img-box' data-aos="flip-up">
                                <img src={bottleTransparent} alt="وحید پرفیوم" />
                            </div>
                        </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center introduction-text">
                            <div className="intro-content" data-aos="zoom-in-up">
                                <h3 data-aos="zoom-in-up"> وحید پرفیوم <span>PERFUME</span></h3>
                                <p>
                                مرجعی برای خرید عطر با کیفیت و قیمت مناسب. ما بهترین برندهای عطر را با گارانتی اصالت و بهترین قیمت به شما عرضه می‌کنیم. با توجه به تجربه بیش از ۱۰ ساله در این صنعت، ما بهترین محصولات را با تضمین کیفیت به شما ارائه می‌دهیم.
                                </p>
                                <Link to="/contact" className='prim-btn' style={{width:'50%'}}>ارتباط با تیم</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider