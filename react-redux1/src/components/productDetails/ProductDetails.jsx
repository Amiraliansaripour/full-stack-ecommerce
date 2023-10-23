import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../pages/layout/Layout';
import { numberComma } from '../../customHooks/SpliteNumber';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState()
    const [similar, setSimilar] = useState([])

    // get product
    const getSingleProduct = async () => {
        await axios.get(`http://localhost:8080/api/product/${id}`).then((response) => {
            setProduct(response?.data?.data)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getSingleProduct()
    }, [])


    const getSimilarProduct = async () => {
        if (product) {
            await axios.get(`http://localhost:8080/api/product/similar/${product?.category?._id}`).then((response)=>{
                setSimilar(response?.data?.data)
            })
            // 8:11:50
        }
    }
    return (
        <Layout
            title={product?.name ? product?.name : "صفحه محصول"}
            description={product?.description ? product?.description : "توضیحات محصول"}>
            <div className="row container">
                <div className="col-md-6">
                    <img
                        src={`http://localhost:8080/${product?.thumb}`}
                        alt={product?.name}
                        className='card-img-top round'
                        height='350px'
                        width="350px" />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product D etails</h1>
                    <h4>نام: {product?.name}</h4>
                    <h6>نام انگلیسی: {product?.enName}</h6>
                    <h6>توضیحات: {product?.description}</h6>
                    <h6>قیمت: {product?.price && numberComma(product?.price)}</h6>
                    <h6>دسته بندی : {product?.category?.name}</h6>
                    <h6>رایحه: {product?.smell?.name}</h6>
                    <h6>میل: {product?.mil?.name}</h6>
                    <button className='btn btn-info'>اضافه به صفحه خرید</button>
                </div>
            </div>
            <div className="row p-2">
                similar product
            </div>
        </Layout>
    )
}

export default ProductDetails