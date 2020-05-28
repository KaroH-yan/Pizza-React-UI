import React, {useRef, useState} from "react"
import {Button, Input} from "antd"
import agent from "../../services/auth";

export default ({toHIde=()=>{}, title=""}) => {
    const userNameRef = useRef(null)
    const [password, setPassword] = useState("")
    const handleClick = () => {
        agent.login(userNameRef.current.state.value, password)
            .then(res => window.localStorage.setItem('token', `Bearer ${res.token}`))
            .then(() => window.location.reload())
        toHIde()

    };

    return (
        <>
                <span className="title">{!!title? title: "Login"}</span>
                <Input className="user-input" ref={userNameRef}/>
                <Input.Password type="password" onChange={e => setPassword(e.target.value)}/>
                <Button className="login-button" type="primary" onClick={(e) => handleClick(e)}> Log in </Button>
        </>
    )
}