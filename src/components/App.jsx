import Header from "./Header";
import {useRoutes} from "react-router-dom"
import Main from "./main/Main";
import Home from "./home/Home";
import Auth from "./auth/Auth"
import 'primereact/resources/themes/soho-light/theme.css';
import './App.css'
import 'primeicons/primeicons.css';
import Reg from "./reg/Reg";

export default function App() {
    const routeConfig = [
        ...(['/', '/home'].map(path => ({path, element: <Home/>}))),
        {path: "/main", element: <Main/>},
        {path: "/auth", element: <Auth/>},
        {path: "/reg", element: <Reg/>}
    ]
    const Pages = () => useRoutes(routeConfig)
    return (
        <div className="App">
            <Header/>
            <Pages/>
        </div>
    );
}

