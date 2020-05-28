import React from "react"
import {Col, Row} from "antd"
import Card from "../components/ItemCard"


export default () => {
    const menuList = [
        {
            id: 7,
            name: "Coca-cola",
            price: 0.8,
            img: "coca-cola.png"
        },
        {
            id: 8,
            name: "Coca-cola Zero",
            price: 0.8,
            img: "coca-cola-zero.png"
        },
        {
            id: 9,
            name: "Coca-cola Cherry",
            price: 0.8,
            // img: "../../assets/images/pizza-1.png"
        },
        {
            id: 10,
            name: "Pepsi",
            price: 0.8,
            // img: "../../assets/images/pizza-1.png"
        },
        {
            id: 11,
            name: "Fanta",
            price: 0.8,
            img: "fanta.png"
        },
        {
            id: 12,
            name: "Sprite",
            price: 0.8,
            img: "sprite.png"
        },

    ];

    return (
        <div className="menu-list">
            <Row gutter={48}>
                {menuList.map((el, index) =>
                    <Col key={index} xl={8} xxl={6}>
                        <Card name={el.name} key={index} {...el}/>
                    </Col>)}
            </Row>
        </div>
    )
}