import {useSelector} from "react-redux";
import "./Table.css"
function Table() {
    let points = useSelector((state) => state.points.points)
    return (
        <div id="res_table_div">
            <table id="res_table">
                <thead>
                <tr>
                    <td>X</td>
                    <td>Y</td>
                    <td>R</td>
                    <td>Результат</td>
                </tr>
                </thead>
                <tbody>
                {points ? points.map(point => (
                    <tr className={"add_row"} key={point.id}>
                        <td>{point.x}</td>
                        <td>{point.y}</td>
                        <td>{point.r}</td>
                        <td><p className={point.res ? "row_shot" : "row_lose"}>{point.res ? "Попал!" : "Не попал!"}</p></td>
                    </tr>
                )) : null}
                </tbody>
            </table>
        </div>
    )
}

export default Table