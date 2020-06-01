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
import {CHANGE_CURRENCY, CHANGE_VISIBILITY_CART, CHANGE_VISIBILITY_LOGIN} from "./redux/action-types";

const {Content, Header, Footer} = Layout;

const logOut = () => {
    window.localStorage.removeItem("token");
    window.location.reload()
};


export default () => {
    const [isLogin, setIsLogin] = useState(false);
    const {currency, ordered, showCart, showLogin} = useSelector(state => state);
    const dispatch = useDispatch();

    const token = window.localStorage.getItem('token');

    useEffect(() => {
        if (ordered.length === 0) {
            dispatch({type: CHANGE_VISIBILITY_CART, payload: false})
        }
    }, [ordered]);

    useEffect(() => {
        token ? setIsLogin(true) : setIsLogin(false)
    }, [token]);

    return (
        <Router>
            <Layout>
                <Header>
                    <div style={{display: "flex"}}>
                        <Link to="/pizza"> Pizza</Link>
                        {isLogin && <Link to="/history">Orders history</Link>}
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

                        <button
                            className="cart-button"
                            onClick={() => dispatch({
                                type: CHANGE_VISIBILITY_LOGIN,
                                payload: (!showLogin)
                            })}
                        >
                            {isLogin
                                ? <LogoutOutlined onClick={() => logOut()}/>
                                : <LoginOutlined onClick={() => dispatch({
                                    type: CHANGE_VISIBILITY_LOGIN,
                                    payload: (!showLogin)
                                })}
                                />
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
            <Footer style={{textAlign: "center"}}>Made by Karo 2020</Footer>
            {showCart && <Cart/>}
            {showLogin && <div className="login-container"><Login/></div>}
        </Router>
    );
}

