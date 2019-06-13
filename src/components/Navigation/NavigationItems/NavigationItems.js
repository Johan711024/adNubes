import React from 'react';

//import classes from './NavigationItems.css';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className="NavigationItems">
        {props.isAuthenticated 
            ? <NavigationItem link="/start-build">Build It, Try It</NavigationItem>
            : null
        }
        {props.isAuthenticated 
            ? <NavigationItem link="/orders">And Buy It</NavigationItem>
            : null
        }
        {!props.isAuthenticated
            ? <NavigationItem link="/" exact>Watch A Demo</NavigationItem>
            : null
        }
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth"> And Try The Real Thing!</NavigationItem>
            : <NavigationItem link="/logout">Or Come Back...</NavigationItem>
        }
    </ul>
);

export default navigationItems;