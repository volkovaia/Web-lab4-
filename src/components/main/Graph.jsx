import {add_point, get_points} from "../points_tools"
import {useDispatch, useSelector} from "react-redux";
import {error, msg, update_points} from "../../store";
export default function Graph(props){
    const dispatch = useDispatch()
    const points = useSelector((state)=>state.points.points)
    async function clickHandled(event){
        if(!props.r && props.r !== 0){
            dispatch(error("Радиус не введен!"))
            return
        }
        if (props.r <= 0) {
            dispatch(error("Некорректное значение r"))
            return
        }
        let pt = document.getElementsByClassName("graph")[0].createSVGPoint()
        pt.x = event.clientX
        pt.y = event.clientY
        let cursor_pt = pt.matrixTransform(event.target.getScreenCTM().inverse())
        let [x,y] = [cursor_pt.x,cursor_pt.y]
        x=(x-200)/160;
        y=-(y-200)/160;
        x*=props.r
        y*=props.r
        x = x.toFixed (3);
        y = y.toFixed (3);
        const res = await add_point(x,y,props.r)
        if(!res)dispatch(error("Потеряно соединение с сервером"))
        else if(!res.success)dispatch(error("Сессия истекла"))
        else {
            dispatch(msg("Точка успешно добавлена"))
            dispatch(update_points((await get_points()).points))
        }
    }

    return (
        <svg width="500"
             height="500"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 400 400"
             className="graph"
             onClick={clickHandled}>
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#111111"></line>
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#111111"></line>
            <text x="88%" y="57%" className="graph_R">{props.r && props.r > 0? props.r : "R"}</text>
            <line x1="90%" y1="52%" x2="90%" y2="48%" stroke="#111111"></line>
            <text x="68%" y="57%" className="graph_R2">{props.r && props.r > 0 ? props.r/2 : "R/2"}</text>
            <line x1="70%" y1="52%" x2="70%" y2="48%" stroke="#111111"></line>
            <text x="28%" y="57%" className="graph_MR2">{props.r && props.r > 0 ? -props.r/2 : "-R/2"}</text>
            <line x1="30%" y1="52%" x2="30%" y2="48%" stroke="#111111"></line>
            <text x="8%" y="57%" className="graph_MR">{props.r && props.r > 0 ? -props.r : "-R"}</text>
            <line x1="10%" y1="52%" x2="10%" y2="48%" stroke="#111111"></line>
            <text x="53%" y="11%" className="graph_R">{props.r && props.r > 0 ? props.r : "R"}</text>
            <line x1="48%" y1="10%" x2="52%" y2="10%" stroke="#111111"></line>
            <text x="53%" y="31%" className="graph_R2">{props.r && props.r > 0 ? props.r/2 : "R/2"}</text>
            <line x1="48%" y1="30%" x2="52%" y2="30%" stroke="#111111"></line>
            <text x="53%" y="71%" className="graph_MR2">{props.r && props.r > 0 ? -props.r/2 : "-R/2"}</text>
            <line x1="48%" y1="70%" x2="52%" y2="70%" stroke="#111111"></line>
            <text x="53%" y="91%" className="graph_MR">{props.r && props.r > 0 ? -props.r : "-R"}</text>
            <line x1="48%" y1="90%" x2="52%" y2="90%" stroke="#111111"></line>
            <text x="53%" y="4%">x</text>
            <text x="97.5%" y="55.5%">y</text>
            <path d="M 385 195 l 15 5 l -15 5 z" stroke="#111111" fill="#111111"></path>
            <path d="M 205 15 l -5 -15 l -5 15 z" stroke="#111111" fill="#111111"></path>
            <path d="M 200 200 L 200 40 A 160 160 0 0 1 360 200 Z" fillOpacity="0.4" stroke="#111111"
                  fill="blue" strokeWidth="2"></path>
            <path d="M 200 200 L 360 200 L 360 280 L 200 280 Z" fillOpacity="0.4" stroke="#111111" fill="blue"
                  strokeWidth="2"></path>
            <path d="M 200 200 L 120 200 L 200 40 Z" fillOpacity="0.4" stroke="#111111" fill="blue"
                  strokeWidth="2"></path>
            {points && props.r && props.r > 0 ? points.map(point => (
                <circle cx={(point.x/props.r)*160+200} cy={(-point.y/props.r)*160+200} r="2" className="add_point"
                        fill={point.r !== props.r ? "blue" : point.res ? "green" : "red"}
                        stroke={point.r !== props.r ? "blue" : point.res ? "green" : "red"}
                        key={point.id}
                />
            )) : null}
        </svg>
    )
}