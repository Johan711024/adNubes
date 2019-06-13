import React, { Component } from 'react';
import demoPic from '../../assets/images/adnubes-demo.png';

class Demo extends Component {
    
    render () {
        return(
            <div style={{height: '100%', marginTop: '20%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
                <img src={demoPic} alt="demo" />
            </div>
        )


    }
}


export default Demo
    
    