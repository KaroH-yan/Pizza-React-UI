import React from "react"
import {useDispatch} from "react-redux"
import {UPDATE_ORDER} from "../../../redux/action-types";

export default ({item}) => {
    const dispatch = useDispatch()

    return (
        <div className="number-changer">
            <button
                className="decrease"
                onClick={() => dispatch({type: UPDATE_ORDER, payload: {...item, quantity: item.quantity - 1}})}
            >
                -
            </button>
            <input type="number" min={0} step={1} value={item.quantity}/>
            <button
                className="increase"
                onClick={()=>   dispatch({type: UPDATE_ORDER, payload: {...item, quantity:item.quantity+1}})}
            >
                +
            </button>
        </div>
    )
}