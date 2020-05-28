import React, {useEffect, useState} from "react"
import {Row, Col} from "antd"
import Item from "./components/Item"
import agent from "../../services/pizza";

export default () => {
    const [data, setData] = useState()

    useEffect(() => {
        agent.history().then(res => setData(res.data))
    }, []);




    const reducer = (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity)

    return (
      <>
          <Row gutter={24} >
            {!!data && data.map((el, index) =>

            <Col span={8}>
                <Item key={index} {...el}/>
            </Col>

            )}
          </Row>
        </>
    )
}