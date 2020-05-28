import React, {useState, useEffect} from "react"
import {Col, Row, Spin} from "antd"
import Pizza from "../components/ItemCard"
import agent from "../../services/pizza"

export default () => {
    const [data, setData] = useState()
    const [pages, setPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    let result = [];

    useEffect(() => {
        agent.pizzaLIst(currentPage)
            .then(res => {
                setData(res.data)
                setPages(res.pagination)
            })
    }, [currentPage])

    const renderPagination = (quantity = 1) => {
        let i = 0;
        do {
            i = i + 1;
            result.push(i);
        } while (i < quantity);
    };
    const includes = "Fresh Fish, Tiger Prawn, Squid, Venus Clams, Tomato Sauce, Basil"



    return (
        <div className="menu-list">
            {!!data ?
                <>
                    <img alt="example" src={require(`../../assets/images/bannerPizza.jpg`)} className="banner" />
                    <div className="banner-discount"> Discount <b>-25%</b> only Today</div>
                    <Row gutter={48}>
                        {data.map((el, index) =>
                            <Col key={index} xl={8} xxl={6}>
                                <Pizza name={el.name} key={index} includes={includes}
                                       img={`pizza-${index + 1 <= 4 ? index + 1 : index % 4 + 1}.png`} {...el}/>
                            </Col>)

                        }
                    </Row>

                    {!!pages && renderPagination(pages.total_pages)}
                    <div className="pagination-part">
                        {result.map(el => <div
                            className={`pagination-number ${el === currentPage && "selected-button"}`}
                            onClick={() => setCurrentPage(el)}> {el}</div>)}
                    </div>
                </>
                :
                <Spin className="loading-spin" tip={"Loading..."}/>
            }
        </div>

    )

}