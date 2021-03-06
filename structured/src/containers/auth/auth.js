import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/user-interface/input/input';
import Button from '../../components/user-interface/button/button';
import Spinner from '../../components/user-interface/spinner/spinner';
import * as actions from '../../redux/actions/index';
import './auth.css';

class Auth extends Component {
    state = {
        controls: {
            username: {
                signin: true,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                signin: true,
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            about: {
                signin: false,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'something about yourself',
                    rows: '4'
                },
                value: '',
                validation: {
                    required: false,
                    isEmail: false
                },
                valid: true,
                touched: false
            }
        },
        signup: true
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required)
            isValid = value.trim() !== '' && isValid;
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.username.value, this.state.controls.password.value, this.state.signup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            signup: !prevState.signup
        }));
    };

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(element => ((this.state.signup || element.config.signin)
            ? <Input elementType={element.config.elementType}
                   elementConfig={element.config.elementConfig}
                   value={element.config.value}
                   changed={(event) => this.inputChangedHandler(event, element.id)}
                   invalid={!element.config.valid}
                   shouldValidate={element.config.validation}
                   touched={element.config.touched}
                   key={element.id} />
            : null
        ));
        if (this.props.waiting)
            form = <Spinner/>;
        let errorMessage = null;
        if (this.props.error)
            errorMessage = (<p>{this.props.error}</p>);

        let authRedirect = null;
        if (this.props.authenticated)
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;

        return (
            <div className="AuthContent">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                {this.state.signup ? <p>Already have an account? <strong>Sign in instead.</strong></p> : null}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.signup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        waiting: state.auth.waiting,
        error: state.auth.error,
        authenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, mode) => dispatch(actions.auth(username, password, mode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Auth);