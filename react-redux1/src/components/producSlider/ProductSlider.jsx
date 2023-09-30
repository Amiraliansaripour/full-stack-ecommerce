import React from 'react'
import waveImage from '../../assets/svg/stacked-waves-haikei.svg'
import './ProductSlider.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { numberComma } from '../../customHooks/SpliteNumber'
import WaterDropIcon from '@mui/icons-material/WaterDrop';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const ProductSlider = ({ background }) => {
    const allProduct = useSelector((state) => state.appReducer.products)
    const style = {
        width: '95%',
        height: 400,
        borderRadius: '15px',
        overflow: 'hidden',
        background: `url(${background})`,
        gap: 10,
        border: '1.5px solid #947b72',
    }

    return (
        <div className='container-fluid  d-flex align-items-center justify-content-center p-2'>
            <div style={style} data-aos="fade-up" className='wave-background d-flex align-items-center justify-content-center'>
                <Swiper
                 spaceBetween={30}
                //  slidesPerView={3.5}
                
                breakpoints={{
                    0: {
                      slidesPerView: 1.5,
                    },
                    400:{
                      slidesPerView:1.5,
                    },
                    639: {
                      slidesPerView: 2.5,
                    },
                    865:{
                      slidesPerView:3
                    },
                    1000:{
                      slidesPerView:3.5
                    },
                    1500:{
                      slidesPerView:4
                    },
                    1700:{
                      slidesPerView:4
                    }
                  }}
    
                >
                    {
                        allProduct?.map((product) => (
                            <SwiperSlide>
                                <div className="product-card" key={product._id}>

                                    <div className="product-img">
                                        <div className="product-lable">
                                            %10
                                        </div>
                                        <img src={product?.img[0]} className="p-image" alt={product?.title} />
                                    </div>

                                    <div className="product-content">
                                        <div className="product-title">
                                            <Link><strong>{product?.title?.length >= 25 && '...'} {product?.title.substring(0, 25)}</strong></Link><br />
                                            <Link><strong style={{ fontSize: 10 }}>{product?.english}</strong></Link>
                                        </div>
                                        <div className="line"></div>
                                        <div className="product-mill d-flex">
                                            <WaterDropIcon />
                                            {product?.mill}ml
                                        </div>

                                        <div className="product-price p-2">
                                            <Link>
                                                {numberComma(product?.price)} <span>T</span>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        </div>
    )
}

ProductSlider.defaultProps = {
    background: waveImage
}

export default ProductSlider