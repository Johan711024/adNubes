import React, { Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
//import classes from './Auth.css';
import './Auth.css';
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router-dom'



class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignedUp: true,
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
                
            }
        }
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp)
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignedUp: !prevState.isSignedUp}
        })
    }




    render () {
        let authRedirect = null
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to="/start-build" />
        }
        const formElementsArray = [];
        for (let key in this.state.controls) {
            
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => {
            
            return(
            <Input
                name={formElement.config.name}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        )})

        if (this.props.loading){
            form = <Spinner />
        } 

        let errorMessage = null
        if (this.props.error){
            errorMessage= (
                <p>{this.props.error.message}</p>
            )
        }
        
        return (
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                     clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignedUp ? 'SIGNUP' : 'SIGNIN'}
                </Button>
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp))
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Auth);