import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Card, Divider, InputNumber} from "antd"
import classNames from "classnames"

import {ADD_TO_ORDER} from "../../redux/action-types";

const {Meta} = Card;

export default ({name, ...props}) => {
    const [quantity, setCount] = useState(1)
    const {ordered, currency } = useSelector(state => state)
    const dispatch = useDispatch()

    const totalPayment=(price,currency) =>
       price.toLocaleString('de-DE', {
        style: 'currency',
        currency: currency==="EURO"? 'EUR': "USD",
        minimumFractionDigits: 0,
    })

    ;

    useEffect(() => {
        ordered.map(el => el.id === props.id && setCount(el.quantity))
    }, [ordered])


    const buttonClass = classNames({
        "add-button": !ordered.filter(el => el.id === props.id).length,
        "selected-button": ordered.filter(el => el.id === props.id).length
    });

    return (
        <Card
            hoverable
            className="menu-list-item"
            cover={<img alt="example" src={props.img ? require(`../../assets/images/${props.img}`) : ""}/>}
        >
            <div className="card-header"><Meta title={name} description={props.includes ? props.includes :""}/>
                {props.prices.filter(el=>el.currency===`${currency}`).map(el=><div className="card-price">{totalPayment(el.price, el.currency)}</div> )}
            </div>
            <Divider/>
            <div className="add-section">
                <InputNumber min={1} max={100} defaultValue={1} onChange={value => setCount(value)} value={quantity}/>
                <button className={buttonClass}
                        onClick={() => dispatch({type: ADD_TO_ORDER, payload: {name, ...props, quantity}})}>Add to Cart
                </button>
            </div>
        </Card>

    )
}