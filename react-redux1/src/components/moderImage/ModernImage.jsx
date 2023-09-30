import React from 'react'
import image1 from "../../assets/images/slider/1.jpg"
import image2 from "../../assets/images/slider/6jpg.jpg"
import image3 from "../../assets/images/slider/3.jpg"
import image4 from "../../assets/images/slider/4.jpg"


const ModernImage = () => {
  return (
    <div className='container p-2'>
        <div className="row">
            <div className="col-12 col-md-12 col-lg-6 col-xs-12">
                <div className="row">
                    <div className="col-6 p-2" data-aos="zoom-in-right" style={{overflow:"hidden"}}>
                        <img src={image1} alt='ادکلن وحید' style={{minWidth:'100%',height:'180px',objectFit:"cover",borderRadius:"10px"}} />
                    </div>
                    <div className="col-6 p-2" data-aos="zoom-in-left" style={{overflow:"hidden"}}>
                        <img src={image2} alt='ادکلن وحید' style={{minWidth:'100%',height:'180px',objectFit:"cover",borderRadius:"10px"}} />
                    </div>
                </div>
            
            </div>
            <div className="col-12 col-md-12 col-lg-6 col-xs-12">
            <div className="row">
                    <div className="col-6 p-2" data-aos="zoom-in-right" style={{overflow:"hidden"}}>
                        <img src={image3} alt='ادکلن وحید' style={{minWidth:'100%',height:'180px',objectFit:"cover",borderRadius:"10px"}} />
                    </div>
                    <div className="col-6 p-2" data-aos="zoom-in-left" style={{overflow:"hidden"}}>
                        <img src={image4} alt='ادکلن وحید' style={{minWidth:'100%',height:'180px',objectFit:"cover",borderRadius:"10px"}} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModernImage