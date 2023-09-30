import React, { useEffect } from 'react'
import Slider from './slider/Slider'
import { ProductSlider, Guarantee, ModernImage } from '../../components'
import Layout from '../layout/Layout'

const Home = () => {
  
  
  return (
    <>
      <Layout
        title={"وحید پرفیوم"}
        description={"وحید پرفیوم با ارائه کامل ترین مجموعه ادکلن های مردانه و زنانه با قیمت مناسب"}>
        <Slider />
        <Guarantee />
        <ModernImage />
        <ProductSlider />
      </Layout>
    </>
  )
}



export default Home