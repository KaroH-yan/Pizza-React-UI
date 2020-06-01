import React, {useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, Col, Input, message, Row, Spin} from "antd"
import Login from "../login"
import agent from "../../services/pizza";
import {DELETE_ALL_ORDER} from "../../redux/action-types";
import __ from "lodash";

export default ({location}) => {
    const [action, setAction] = useState(false);
    const [toDelete, setDelete] = useState(false);
    const [address, setAddress] = useState("");
    const [focus, setFocus] = useState(false);

    const {currency} = useSelector(state => state);
    const dispatch = useDispatch();


    const token = window.localStorage.getItem("token");
    const desriptionRef = useRef(null);
    const key = 'updatable';


    const reducer = (accumulator, currentValue) => accumulator + (currentValue.prices.filter(el => el.currency === currency)[0].price * currentValue.quantity);
    const total = (prices, count) => {
        const {price} = prices.filter(el => el.currency === currency)[0];
        return __.round(price * count, 2).toLocaleString('de-DE', {
            style: 'currency',
            currency: currency === "EURO" ? 'EUR' : "USD",
            minimumFractionDigits: 0,
        })
    };


    const buyOrder = () => {
        const newOrder = location.state.map(el => {
            return {"pizza_id": el.id, "quantity": el.quantity}
        });

        setFocus(true);
        if (!address) {
            return
        } else {

            agent.buy(newOrder, `${address}`)
                .then(res => res.json)
                .then(() => {
                    message.loading({content: 'Loading...', key});
                    setTimeout(() => {
                        message.success({content: 'Order just Paid', key, duration: 2});
                    }, 1000);
                })
                .then(() => dispatch({type: DELETE_ALL_ORDER}))
                .then(() => window.location.href = '/pizza')
                .catch(err => message.error({content: `${err}`}))
        }
    };

    const cancelOrder = () => {
        message.error('Order canceled', 3);
        setAction(true);
        setDelete(true);

        setTimeout(() => {
            dispatch({type: DELETE_ALL_ORDER});
            window.location.href = '/pizza';
            setAction(false);
            setDelete(false)
        }, 3000)

    };

    return (
        <div className="payment-container">
            {action ?
                <Spin
                    className={toDelete && "delete-spin"} key={0} tip={toDelete ? "Deleting..." : "Loading..."}/>
                :
                <>
                    {!!location.state && !!location.state.length && <>

                        <Row className="item-list">
                            <Col span={24} className="order-title"> Payment Order</Col>
                            {location.state.map(({quantity, prices, name}) =>
                                <>
                                    <Col span={9}> {name}</Col>
                                    <Col span={5} className=" price-col">{quantity} </Col>
                                    <Col span={5}
                                         className=" price-col"> {prices.filter(el => el.currency === currency)[0].price}</Col>
                                    <Col span={5} className=" price-col"> {total(prices, quantity)}</Col>
                                </>
                            )}
                            <Col className="total-part" span={12}>Total</Col>
                            <Col className="total-part"
                                 span={12}>{`${location.state.reduce(reducer, 0)} ${currency}`}</Col>
                        </Row>
                    </>}


                    {token ?
                        <div className="address-part">
                            <div className="order-title"> Address and Description</div>
                            <Input placeholder="Type your address*"
                                   onChange={(e) => setAddress(e.target.value)}
                                   className={focus && !address && "red-input"}/>
                            <Input.TextArea ref={desriptionRef}
                                            placeholder="Type some text if it necessary for your order"/>
                            <div className="order-action">
                                <Button type="primary" onClick={() => buyOrder()}>Buy</Button>
                                <Button type="danger" onClick={() => cancelOrder()}>Cancel Order</Button>
                            </div>
                        </div>
                        :
                        <div className="payment-login">
                            <Login title="Please login for making payment"/>
                        </div>
                    }


                </>
            }
        </div>
    )
}