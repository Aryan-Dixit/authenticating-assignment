import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import './Navbar.css';
function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    return(
        <div>
            <nav className="navbar-top">
                <ul className="nav-menu" style={showDropdown ? {marginBottom : "0px"} : {marginBottom : "134px"}}>
                {SidebarData.map((item, index) => {return(
                        window.location.pathname === item.path &&
                        <li key={index} className="nav-item"
                            id={window.location.pathname === item.path ? "active" : ""}
                            onClick={() => {
                                window.location.pathname = item.path
                            }}

                            onMouseEnter={() => setShowDropdown(true)}
                        >
                            <span>{item.title}</span>
                            <i className="fas fa-caret-down" style={{ width: 25, height: 20, justifyContent: "right" }}/>
                        </li>
                    )})}
                </ul>
            </nav>
            {showDropdown && <ul className={dropdown ? "nav-list clicked" : "nav-list"} 
                onClick={() => setDropdown(!dropdown)} 
                onMouseLeave={() => setShowDropdown(false)}>
                {SidebarData.map((item, index) => {return(
                    <li key={index} className={item.cName}
                        onClick={() => {
                            window.location.pathname = item.path
                        }}
                    >
                        <Link to={item.path}>
                            <i className={item.icon} style={{ width: 25, height: 20, justifyContent: "right" }}/>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )})}
            </ul>}
            <div style={{ justifyContent:"center", alignItems:"center", display:"flex" }}>
                <h1>Welcome to Bus Ticket Booking Application</h1>
            </div>
        </div>
    )
}

export default Navbar