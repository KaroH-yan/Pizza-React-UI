import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Button, Col, Divider, Row} from "antd"
import NumberChange from "./components/NumberChange"
import {CloseOutlined, DeleteOutlined} from '@ant-design/icons'
import __ from "lodash"
import "./index.css"
import {CHANGE_VISIBILITY_CART, DELETE_ALL_ORDER, DELETE_FROM_ORDER} from "../../redux/action-types";

export default () => {
    const {ordered, currency, showCart} = useSelector(state => state);
    const dispatch = useDispatch();

    const reducer = (accumulator, currentValue) => accumulator + (currentValue.prices.filter(el => el.currency === currency)[0].price * currentValue.quantity);

    const total = (prices, count) => {
        const {price} = prices.filter(el => el.currency === currency)[0];
        return __.round(price * count, 2).toLocaleString('de-DE', {
            style: 'currency',
            currency: currency === "EURO" ? 'EUR' : "USD",
            minimumFractionDigits: 0,
        })
    };

    return (
        <div className="cart-menu">
            <div style={{display: "flex"}}>
                <h1> Cart List</h1>
                <span>
                    <CloseOutlined onClick={() => !!ordered.length && dispatch({
                    type: CHANGE_VISIBILITY_CART,
                    payload: (!showCart)
                })}/>
                </span>
            </div>
            <Divider/>
            {ordered.map((item, index) => <>
                <Row gutter={8}>
                    <Col span={2}> {index + 1}.</Col>
                    <Col span={11}> {item.name}</Col>
                    <Col span={5}> <NumberChange item={item}/></Col>
                    {/*<Col span={4} className="price-col" > {Math.round(item.count*item.price)}</Col>*/}
                    <Col span={4} className="price-col"> {total(item.prices, item.quantity)}</Col>
                    {/*<Col span={4} className="price-col"> {__.round(item.quantity * item.price, 2)}</Col>*/}
                    <Col span={2}>
                        <DeleteOutlined onClick={() => dispatch({type: DELETE_FROM_ORDER, payload: item.id})}/>
                    </Col>
                </Row>
            </>)}
            <Divider/>
            <div className="cart-total">
                <div style={{fontSize: 32}}> Total</div>
                <div className="cart-total-price"> {`${ordered.reduce(reducer, 0)} ${currency}`} </div>
            </div>
            <Divider/>
            <div>
                <Button.Group>
                    <Button
                        type="primary"
                        className="cart-buttons left-button"
                        // onClick={toHIde}
                    >
                        <Link to={{pathname: '/payment', state: [...ordered]}}
                              onClick={() => dispatch({type: CHANGE_VISIBILITY_CART, payload: (false)})}> Make
                            Payment</Link>
                    </Button>
                    <Button
                        type="danger"
                        className="cart-buttons right-button"
                        onClick={() => dispatch({type: DELETE_ALL_ORDER})}
                    >
                        Clear List
                    </Button>
                </Button.Group>
            </div>
        </div>
    )
}