import React from 'react';
import {Button} from "primereact/button"
import {InputText} from 'primereact/inputtext';
import {Message} from 'primereact/message';
import {register} from "../auth_tools";
import {Link} from "react-router-dom";

export default function RegForm(props) {
    const [state, setState] = React.useState({})
    async function handleSubmit() {
        if (state.username && state.password) {
            const res = await register(state.username, state.password)
            if(!res){
                setState({...state,msg:{
                        type: "error",
                        text: "Ошибка подключения к сервису"
                    }})
            }
            else if(!res.success){
                setState({...state,msg:{
                        type: "error",
                        text: "Такой пользователь уже зарегистрирован"
                    }})
            }
            else{
                setState({...state,msg:{
                        type: "success",
                        text: "Успешная регистрация. Не забудьте авторизоваться!"
                    }})
            }
        }
    }

    function handleUsernameChange(event) {
        setState({...state,username: event.target.value})
    }

    function handlePasswordChange(event) {
        setState({...state,password: event.target.value})
    }

    return <div className="auth-form">
        <div className="grid p-fluid">
            <h1 className="page-title-text">Регистрация</h1>
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText id="username_auth" placeholder="Имя пользователя" onChange={handleUsernameChange}/>
            </div>
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-asterisk"></i>
                </span>
                <InputText id="password_auth" placeholder="Пароль" type="password" onChange={handlePasswordChange}/>
            </div>
            <Button className="submit" label="Регистрация" type="submit" disabled={!state.username || !state.password} onClick={handleSubmit}/>
            <div className="error-palette">
                {state.msg ? state.msg.type === "success" ? <Message severity="success" text={state.msg.text}/> :
                    <Message severity="error" text={state.msg.text}/> : null}
            </div>
            <Link to="/auth" hidden={state.msg}>
                <p className="register">Уже зарегистрированы?</p>
            </Link>
        </div>
    </div>
}