    import Graph from "./Graph";
import "./Main.css"
import {Button} from "primereact/button";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {error, msg, update_points} from "../../store";
import {add_point, clear_points, get_points} from "../points_tools";
import {Message} from "primereact/message";
import Table from "./Table";

function validate_text_field(y) {
    try {
        let y_num = Number(y.replace(',', '.').trim());
        if (!y_num && y_num !== 0) return false;
        if (y_num <= 3 && y_num >= -5) return y_num;
        return false;
    } catch (e) {
        return false;
    }
}

export default function Main(props) {
    const [state, setState] = useState({})
    let dispatch = useDispatch()
    let msg_text = useSelector((state) => state.points.msg)
    let username = useSelector((state) => state.auth.username)

    async function handleSubmit() {
        let val_y = validate_text_field(state.y)
        if (val_y === false) {
            dispatch(error("Некорректное значение y"))
            return
        }
        if (state.r <= 0) {
            dispatch(error("Некорректное значение r"))
            return
        }
        const res = await add_point(state.x, val_y, state.r)
        if (!res) dispatch(error("Потеряно соединение с сервером"))
        else if (!res.success) dispatch(error("Сессия истекла"))
        else {
            dispatch(msg("Точка успешно добавлена"))
            dispatch(update_points((await get_points()).points))
        }
    }

    async function handleClear() {
        await clear_points()
        dispatch(update_points((await get_points()).points))
    }

    function changeX(event) {
        setState({...state, x: Number(event.target.value)})
    }

    async function changeR(event) {
        setState({...state, r: Number(event.target.value)})
        dispatch(update_points((await get_points()).points))
    }

    function changeY(event) {
        setState({...state, y: event.target.value})
    }

    if (!username) {
        return (<div className="page">
            <div className="content-forbidden">
                <h1>Вы не авторизированы!</h1>
            </div>
        </div>)
    }
    return (<div className="page">
        <h1 className="page-title-text">График</h1>
        <div className="main-page-content">
            <div className="main-controls">
                <div className="inp-block">
                    <h1>Выберите x</h1>
                    <div className="inp-pane-r r-inp-pane">
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_mtwo" name="x" onChange={changeX} value="-2"/>
                            <label htmlFor="x_mtwo">-2</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_monef" name="x" onChange={changeX} value="-1.5"/>
                            <label htmlFor="x_monef">-1.5</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_mone" name="x" onChange={changeX} value="-1"/>
                            <label htmlFor="x_mone">-1</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_mzerof" name="x" onChange={changeX} value="-0.5"/>
                            <label htmlFor="x_mzerof">-0.5</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_zero" name="x" onChange={changeX} value="0"/>
                            <label htmlFor="x_zero">0</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_zerof" name="x" onChange={changeX} value="0.5"/>
                            <label htmlFor="x_zerof">0.5</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_one" name="x" onChange={changeX} value="1"/>
                            <label htmlFor="x_one">1</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_onef" name="x" onChange={changeX} value="1.5"/>
                            <label htmlFor="x_onef">1.5</label>
                        </span>
                        <span className="r-inp-el inp-x">
                            <input type="radio" id="x_two" name="x" onChange={changeX} value="2"/>
                            <label htmlFor="x_two">2</label>
                        </span>
                    </div>
                </div>
                <div className="inp-block">
                    <h1>Введите y</h1>
                    <input className="inp-y text-inp" type="text" onChange={changeY}/>
                </div>
                <div className="inp-block">
                    <h1>Выберите r</h1>
                    <div className="inp-pane-r r-inp-pane">
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_mtwo" name="r" onChange={changeR} value="-2"/>
                            <label htmlFor="r_mtwo">-2</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_monef" name="r" onChange={changeR} value="-1.5"/>
                            <label htmlFor="r_monef">-1.5</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_mone" name="r" onChange={changeR} value="-1"/>
                            <label htmlFor="r_mone">-1</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_mzerof" name="r" onChange={changeR} value="-0.5"/>
                            <label htmlFor="r_mzerof">-0.5</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_zero" name="r" onChange={changeR} value="0"/>
                            <label htmlFor="r_zero">0</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_zerof" name="r" onChange={changeR} value="0.5"/>
                            <label htmlFor="r_zerof">0.5</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_one" name="r" onChange={changeR} value="1"/>
                            <label htmlFor="r_one">1</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_onef" name="r" onChange={changeR} value="1.5"/>
                            <label htmlFor="r_onef">1.5</label>
                        </span>
                        <span className="r-inp-el inp-r">
                            <input type="radio" id="r_two" name="r" onChange={changeR} value="2"/>
                            <label htmlFor="r_two">2</label>
                        </span>
                    </div>
                </div>
                <Button className="submit-frm ctrl-btn" label="Отправить" type="submit"
                        disabled={(!state.x && state.x !== 0) || !state.y || (!state.r && state.r !== 0)}
                        onClick={handleSubmit}/>
                <Button className="clear-frm ctrl-btn" label="Очистить коллекцию" type="submit" onClick={handleClear}/>
                <div className="error-palette">
                    {msg_text ? msg_text.type === "success" ? <Message severity="success" text={msg_text.text}/> :
                        <Message severity="error" text={msg_text.text}/> : null}
                </div>
            </div>
            <Graph r={state.r}/>
        </div>
        <Table/>
    </div>)
}