import {
    ALL_PRODUCTS,
    SLIDER_PRODUCTS,
    MEN_CATEGORY,
    WOMEN_CATEGORY,
    FETCH_PRODUCT,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL
}
    from "./actionTypes";


export const AllProduct = () => {
    return {
        type: ALL_PRODUCTS
    }
}

export const SliderProduct = (count) => {
    return {
        type: SLIDER_PRODUCTS,
        payload: {
            count,
        }
    }
}

export const menCategory = (count) => {
    return {
        type: MEN_CATEGORY,
        payload: {
            count,
        }
    }
}

export const womenCategory = (count) => {
    return {
        type: MEN_CATEGORY,
        payload: {
            count,
        }
    }
}



// Api 
export const getAllProductRequest = (products) => {
    return {
        type: FETCH_PRODUCT,
        payload: products
    }
}

