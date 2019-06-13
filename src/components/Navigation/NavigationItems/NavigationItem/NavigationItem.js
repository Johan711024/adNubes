import React from 'react';
import { NavLink } from 'react-router-dom';

//import classes from './NavigationItem.css';
import './NavigationItem.css'; //fixa classen active med styled comp

const navigationItem = ( props ) => (
    <li className="NavigationItem">
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName="active">{props.children}</NavLink>
    </li>
);

export default navigationItem;