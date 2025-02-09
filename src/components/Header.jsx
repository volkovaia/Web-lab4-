import "./Header.css"
import {str_max_len} from "../utils";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";
export default function Header(props) {
    const username = useSelector((state)=>state.auth.username)
    return (<header>
        <div className="header-text">
            <h1>Лабораторная работа №4  </h1>
            <p className="subtitle">Выполнила: Волкова Ирина Александровна, P3215, ИСУ: 408391</p>
        </div>
        <div className="menu">
            <Link to="/home">
                <input type="button" className="menu-btn" value="На главную"/>
            </Link>
            <Link to="/main">
                <input type="button" className="menu-btn" value="График"/>
            </Link>
            <Link to="/auth">
                <input type="button" className="menu-btn" value="Авторизация"/>
            </Link>
            <p className={"auth-text "+(!username&&"not-auth")}>{
                username ? "Авторизован как: "+str_max_len(username,7)  : "Не авторизован"
            }</p>
        </div>
    </header>)
}