import React from 'react'
import { Header, Footer } from '../../components'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description }) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
            </Helmet>
            
            <Header />
            <main style={{ minHeight: '70vh' }} >{children}</main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'فروشگاه وحید پرفیوم',
    description: 'وحید پرفیوم با ارائه کامل ترین مجموعه ادکلن های مردانه و زنانه با قیمت مناسب'
}

export default Layout