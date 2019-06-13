import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import { connect } from 'react-redux'
import './Layout.css';
//import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAutheticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                />
                <SideDrawer
                    isAuth={this.props.isAutheticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className="Content" >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAutheticated: state.auth.token !== null,        
    }
}
const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout);