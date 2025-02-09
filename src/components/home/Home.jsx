import {Button} from "primereact/button";
import React from "react";
import "./Home.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {exitf} from "../auth_tools";
import {exit} from "../../store";
export default function Home(props) {
    let username = useSelector((state)=>state.auth.username)
    const dispatch = useDispatch()
    async function end_session(){
        await exitf()
        dispatch(exit())
    }
    return (<div className="page">
            <h1 className="page-title-text">Меню</h1>
            <div className="home-page-content">
                <div className="home-controls">
                    <Link to="/main">
                        <Button className="navigate-btn ctrl-btn" label="График"/>
                    </Link>
                    <Link to="/auth">
                        <Button className="navigate-btn ctrl-btn" label="Авторизация"/>
                    </Link>
                    <Link to="/reg">
                        <Button className="navigate-btn ctrl-btn" label="Регистрация"/>
                    </Link>
                    <Button disabled={!username} className="exit-btn ctrl-btn" label="Выйти" onClick={end_session}/>
                </div>
            </div>
        </div>
    )
}