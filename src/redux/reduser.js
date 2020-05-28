import {ADD_TO_ORDER, CHANGE_CURRENCY, DELETE_ALL_ORDER, DELETE_FROM_ORDER, UPDATE_ORDER, CHANGE_VISIBILITY_CART} from "./action-types"
import __ from "lodash"

const initialState = {
    ordered: [],
    currency: "EURO",
    showCart: false
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VISIBILITY_CART:
            return{
                ...state,
                showCart: action.payload
            }
        case ADD_TO_ORDER:
            const orderList =state.ordered.filter(el => el.id !== action.payload.id)
            return {
                ...state,
                ordered: [ ...orderList, action.payload]
            };
        case UPDATE_ORDER:

            return {
                ...state,
                ordered: action.payload.quantity > 0
                    ? state.ordered.map(el => el.id === action.payload.id
                        ? {...el, quantity: action.payload.quantity}
                        : el)
                    : __.remove(state.ordered, (o) => {
                        return o.id !== action.payload.id
                    })
            };
        case CHANGE_CURRENCY:
            return {
                ...state,
                currency: action.payload
            };
        case DELETE_FROM_ORDER:
            return {
                ...state,
                ordered: state.ordered.filter(el => el.id !== action.payload)
            };
        case DELETE_ALL_ORDER:
            return {
                ...state,
                ordered: initialState.ordered
            };
        default:
            return state;
    }
};
export default rootReducer;