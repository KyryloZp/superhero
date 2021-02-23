import React from "react";
import './Header.css'
import wallpaper from "../../image/1_eqpRo4-2-CbTDd-ZbNagVA.jpeg";
import {NavLink} from "react-router-dom";
import logo from '../../image/logo.png'

const Header = () => {
    const logoutHandler = (event) => {
        event.preventDefault()

    }

    return (
        <div className="header">
            <nav className="header__topLine">
                <div className=" container nav-wrapper header__nav">
                    <img src={logo} alt="logo of heroes"/>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/">Main page</NavLink></li>
                        <li><NavLink to="/create">Add new Hero</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Hi, mr (LogOut)</a></li>
                    </ul>
                </div>
            </nav>
            <div className="header__wallpaper  ">
                <img src={wallpaper} alt="wallpaper super Heroes"/>
            </div>
        </div>
    )
}

export default Header