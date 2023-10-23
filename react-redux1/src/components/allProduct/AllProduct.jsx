import React, { useEffect, useState } from 'react'
import Layout from '../../pages/layout/Layout'
import axios from 'axios'
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, } from '@mui/material'
import { Link } from 'react-router-dom'
import { numberComma } from '../../customHooks/SpliteNumber'
import { WaterDrop } from '@mui/icons-material'
import "./AllProduct.css"
import { price } from '../../customHooks/price'
const AllProduct = () => {
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [loading, setLoading] = useState(false)
    // get all category for user
    const getAllCategories = async () => {
        await axios.get('http://localhost:8080/api/category').then((response) => {
            if (response?.data?.result) {
                setCategories(response?.data.data)
            }
        }, (error) => {
            console.log(error)
        })

    }


    // get all products
    const getAllProducts = async () => {
        setLoading(true)
        await axios.get('http://localhost:8080/api/product').then((response) => {
            setTotal(response?.data?.total)
        })

        await axios.get(`http://localhost:8080/api/product/page/${page}`).then((response) => {
            setProducts(response?.data?.data)
            setLoading(false)
        }, (error) => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts()
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProducts()
    }, [checked, radio])

    // filter by category
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }

        setChecked(all)
    }


    // get filtered products
    const filterProducts = async () => {
        setLoading(true)
        await axios.post('http://localhost:8080/api/product/filter', { checked, radio }).then((response) => {
            setProducts([])
            setProducts(response?.data?.data)
            setLoading(false)
        }, (error) => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore()
    }, [page])

    const loadMore = async () => {
        setLoading(true)

        await axios.get(`http://localhost:8080/api/product/page/${page}`).then((response) => {
            setLoading(false)
            setProducts([...products, ...response?.data?.data])
        }, (error) => {
            console.log(error)
            setLoading(false)
        })
    }



    return (
        <Layout title={"وحید پرفیوم | همه محصولات"}>
            <div className='container'>
                <div className="row">
                    <div className="col-3">
                        <h4 className='text-center'>فیلتر محصولات</h4>
                        <FormGroup>
                            {
                                categories ? categories?.map((category, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            onChange={(e) => handleFilter(e.target.checked, category?._id)}
                                            control={<Checkbox />}
                                            label={category?.name} />
                                    )
                                })
                                    : <></>
                            }
                        </FormGroup>
                        <br />
                        {/* <h4>فیلتر براساس قیمت</h4> */}
                        {/* <FormControl> */}
                        {/* <div>
                            <input onChange={e => setRadio(e.target.value)} type="radio" name="drone" value={price[0].array} checked />
                            <label htmlFor={price[0].name}>{price[0].name}</label>
                        </div>
                        {
                            price.slice(1, 4).map((p, index) => {
                                return (
                                    <div key={index}>
                                        <input onChange={e => setRadio(e.target.value)} type="radio" id={p._id} name="drone" value={p.array} />
                                        <label htmlFor={p.name}>{p.name}</label>
                                    </div>
                                )
                            })
                        } */}
                        {/* </FormControl> */}
                    </div>
                    <div className="col-9">
                        <div style={{ flexWrap: "wrap" }} className="d-flex align-items-center justify-content-center">
                            {
                                products ? products?.map((product, index) => {
                                    return (
                                        <div className="product-card border mr-3" key={index}>

                                            <div className="product-img">
                                                <Link to={`/products/${product?._id}`}>
                                                    <img src={`http://localhost:8080/${product?.thumb}`} className="p-image" alt={product?.title} />
                                                </Link>
                                            </div>

                                            <div className="product-content">
                                                <div className="product-title">
                                                    <Link to={`/products/${product?._id}`}><strong>{product?.name?.length >= 25 && '...'} {product?.name.substring(0, 25)}</strong></Link><br />
                                                    <Link to={`/products/${product?._id}`}><strong style={{ fontSize: 10 }}>{product?.enName}</strong></Link>
                                                </div>
                                                <div className="line"></div>
                                                <div className="product-mill d-flex">
                                                    <WaterDrop />
                                                    {product?.mil?.name}ml
                                                </div>

                                                <div className="product-price p-2">
                                                    <Link to={`/products/${product?._id}`}>
                                                        {numberComma(product?.price)} <span>T</span>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                                    : <CircularProgress />
                            }
                        </div>
                        <div className="m-2 p-3">
                            {
                                products && products.length < total && (
                                    <button
                                        className='btn btn-danger'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setPage(page + 1)
                                        }}
                                    >

                                        {loading ? 'درحال بارگذاری' : 'بیشتر'}
                                    </button>
                                )
                            }


                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default AllProduct