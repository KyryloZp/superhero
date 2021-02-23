import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"

function App() {
    const routes = useRoutes()
    return (
        <BrowserRouter>
            <Header/>
            <div className="container">
                {routes}
            </div>
            <Footer/>
        </BrowserRouter>

    );
}


export default App;
