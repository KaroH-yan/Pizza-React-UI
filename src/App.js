import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import Login from "./pages/login"
import Payment from "./pages/payment"
import Pizza from "./pages/pizza"
import Cart from "./pages/cart"
import History from "./pages/history"
import {DollarOutlined, EuroOutlined, LoginOutlined, LogoutOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import {CHANGE_CURRENCY, CHANGE_VISIBILITY_CART} from "./redux/action-types";

const {Content, Header, Footer} = Layout;

const logOut = () => {
    window.localStorage.removeItem("token");
    // window.location.href="/login"
    window.location.reload()
};


export default () => {
    const [login, setLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);


    const token = window.localStorage.getItem('token');
    const dispatch = useDispatch();
    const {currency, ordered, showCart} = useSelector(state => state);


    useEffect(() => {
        if (ordered.length === 0) {
            dispatch({type: CHANGE_VISIBILITY_CART, payload: false})
        }
    }, [ordered]);

    useEffect(() => {
        token ? setIsLogin(true) : setIsLogin(false)
    }, [token]);

    return (
        <>
            <Router>

                <Layout>
                    <Header>
                        <div style={{display: "flex"}}>
                            <Link to="/pizza"> Pizza</Link>
                            {/*<Link to="/juice"> Juice</Link>*/}
                            {isLogin &&   <Link to="/history">Orders history</Link>}
                        </div>

                        <div style={{display: "flex"}}>
                            <button
                                className={`cart-button ${!!ordered.length && "disable-cart-icon"}`}
                                onClick={() => !!ordered.length && dispatch({
                                    type: CHANGE_VISIBILITY_CART,
                                    payload: (!showCart)
                                })}
                            >
                                <ShoppingCartOutlined className={`${!ordered.length && "disable-cart-icon"}`}/>
                                {!!ordered.length && <span className="orders-count">{ordered.length}</span>}

                            </button>
                            <button className="cart-button">

                                {currency === "USD"
                                    ? <DollarOutlined
                                        onClick={() => dispatch({type: CHANGE_CURRENCY, payload: "EURO"})}/>
                                    : <EuroOutlined
                                        onClick={() => dispatch({type: CHANGE_CURRENCY, payload: "USD"})}/>
                                }
                            </button>
                            <button className="cart-button">
                                {isLogin
                                    ? <LogoutOutlined onClick={() => logOut()}/>
                                    : <LoginOutlined onClick={() => setLogin(true)}/>
                                }
                            </button>
                        </div>
                    </Header>
                    <Switch>
                        <Route path="/payment" component={Payment}/>
                        <Content className="site-layout" style={{padding: "0 50px", marginTop: 64, height: "94vh"}}>
                            <Route path="/pizza" exect component={Pizza}/>
                            <Route path="/history" component={History}/>
                            <Redirect to="/pizza"/>
                        </Content>
                    </Switch>
                </Layout>
                <Footer style={{textAlign: "center", }} >Made by Karo 2020</Footer>
                {showCart && <Cart/>}
                {login && <div className="login-container"><Login toHide={() => setLogin(false)}/></div>}
            </Router>

        </>
    );
}

