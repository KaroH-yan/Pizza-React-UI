import React, {useState} from "react"
import {useSelector} from "react-redux"
import {Divider} from "antd";
import Card from "./Card"
import moment from "moment"

export default ({created_at, address, prices, id, ...props}) => {
    const [show, setShow]=useState(false)
    console.log(props, prices)
    const {currency} = useSelector(state => state)
    return (
        <>
        <div className="history-content">
            <div className="header-part">
                <div>Date: <b>{moment(created_at).format("LL")}</b></div>
                <div>Address: <b>{!!address && address}</b></div>
                <Divider/>
                <div>Total: <b>{prices.filter(el => el.currency === currency)[0].price} {currency} </b></div>
            </div>
            <div className="order-more" onClick={()=> setShow(true)}> show more...</div>
        </div>
            {show && <Card currency={currency} show={show} hide={()=> setShow(false)} id={id} />}
            </>
    )
}