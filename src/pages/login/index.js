import React, {useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, Input, message} from "antd"
import agent from "../../services/auth";
import {CloseOutlined} from "@ant-design/icons";
import {CHANGE_VISIBILITY_LOGIN} from "../../redux/action-types";

export default ({title=""}) => {
    const userNameRef = useRef(null);
    const [password, setPassword] = useState("");

    const {showLogin} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClick = () => {
        agent.login(userNameRef.current.state.value, password)
            .then(res => window.localStorage.setItem('token', `Bearer ${res.token}`))
            .then(() => window.location.reload())
            .catch(() => message.error("Please insert right password or email"))
    };

    return (
        <>
                <span className="title">{!!title? title: "Login"}</span>
                <Input className="user-input" ref={userNameRef}/>
                <Input.Password type="password" onChange={e => setPassword(e.target.value)}/>
                <Button className="login-button" type="primary" onClick={(e) => handleClick(e)}> Log in </Button>
            {!title && <CloseOutlined
                onClick={() => dispatch({type: CHANGE_VISIBILITY_LOGIN, payload: (!showLogin)})}
            />}
        </>
    )
}