import React from 'react';
import {Button} from "primereact/button"
import {InputText} from 'primereact/inputtext';
import {Message} from 'primereact/message';
import {do_auth} from "../auth_tools";
import {useDispatch} from "react-redux";
import {login, noerr, update_points} from "../../store";
import {Link} from "react-router-dom";
import {get_points} from "../points_tools";

function AuthForm(props) {
    const [state, setState] = React.useState({})
    const dispatch = useDispatch()
    async function handleSubmit() {
        if (state.username && state.password) {
            const res = await do_auth(state.username, state.password)
            if(!res){
                setState({...state,msg:{
                    type: "error",
                    text: "Ошибка подключения к сервису"
                }})
            }
            else if(!res.success){
                setState({...state,msg:{
                        type: "error",
                        text: "Неправильный логин/пароль"
                }})
            }
            else{
                setState({...state,msg:{
                        type: "success",
                        text: "Успешная авторизация"
                }})
                dispatch(login(state.username))
                dispatch(update_points((await get_points()).points))
                dispatch(noerr())
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
            <h1 className="page-title-text">Авторизация</h1>
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
            <Button className="submit" label="Войти" type="submit" disabled={!state.username || !state.password} onClick={handleSubmit}/>
            <div className="error-palette">
                {state.msg ? state.msg.type === "success" ? <Message severity="success" text={state.msg.text}/> :
                    <Message severity="error" text={state.msg.text}/> : null}
            </div>
            <Link to="/reg" hidden={state.msg}>
                <p className="register">Не зарегистрированы?</p>
            </Link>
        </div>
    </div>
}

export default AuthForm;