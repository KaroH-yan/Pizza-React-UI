import React, {useEffect, useState} from "react"
import {Col, message, Modal, Row} from "antd"
import agent from "../../../services/pizza"
import __ from "lodash";

export default ({show, hide, id, currency}) => {
    const [data, setData] = useState();

    const total = (prices, count) => {
        const {price} = prices.filter(el => el.currency === currency)[0];
        return __.round(price * count, 2).toLocaleString('de-DE', {
            style: 'currency',
            currency: currency === "EURO" ? 'EUR' : "USD",
            minimumFractionDigits: 0,
        })
    };

    const reducer = (accumulator, currentValue) => accumulator + (currentValue.pizza.prices.filter(el => el.currency === currency)[0].price * currentValue.quantity);

    useEffect(() => {
        agent.historyById(id)
            .then(res => !!res && setData(res.data.collections.data))
            .catch(err => message.error({content: err}))
    }, [id]);

    return (
        <Modal
            className="rules-modal"
            title="Order Detalis"
            visible={show}
            footer={null}
            onCancel={hide}
        >

            {!!data &&
            <>
                <Row gutter={12} className="list-item">
                    {data.map(({pizza, quantity}, index) =>
                        <>
                            <Col span={12}>{`${index + 1}.  ${pizza.name}`}</Col>
                            <Col span={4} style={{textAlign: "right"}}>{quantity}</Col>
                            <Col span={4}
                                 style={{textAlign: "right"}}>{pizza.prices.filter(el => el.currency === currency)[0].price}</Col>
                            <Col span={4} style={{textAlign: "right"}}>{total(pizza.prices, quantity)}</Col>
                        </>
                    )}

                </Row>
                <div className="cart-total">
                    <div style={{fontSize: 32}}> Total</div>
                    <div className="cart-total-price"> {`${data.reduce(reducer, 0)} ${currency}`} </div>
                </div>
            </>
            }
        </Modal>
    )
}