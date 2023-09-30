import {
    ALL_PRODUCTS,
    SLIDER_PRODUCTS,
    MEN_CATEGORY,
    WOMEN_CATEGORY,
    FETCH_PRODUCT
}
    from './../actions/actionTypes'


const initialState = {
    products: [],
    error:''
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS:
            return state.products
        case FETCH_PRODUCT:
            return{
                ...state,
                products: action.payload,
                error:''
            }
        default:
            return state
    }
}



export default appReducer