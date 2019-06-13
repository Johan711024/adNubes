import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class TaskBuilder extends Component {
    
    openNewWindow = () => {
        window.open('http://www.dn.se')
    }
    
    render() {
        
        return (            
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
            {!this.props.isAuthenticated 
                ? <Redirect to="/" />
                : null
            }
                <div style={{display: 'block'}}>
                <h1>GigBuilder</h1>
                
                Download our app in appStore/android, or simulate smartphone <button onClick={this.openNewWindow}>here</button>.
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token
    }
}


export default connect (mapStateToProps) (TaskBuilder);