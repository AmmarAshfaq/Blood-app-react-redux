import React from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loginRequestAsync, loginErrorAlert } from '../../store/action/login';
// import applicationSignInReducer from '../../store/reducers/loginReducer';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
const style = {
    paperWapper: {
        width: '70%',
        margin: '100px auto 0px',
        border: '5px solid darkgray',
        padding: '20px'

    },
    textStyle: {
        width: '100%'
    },
    button: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px'
    },
    heading: {
        color: '#212121'
    }

};


function mapStateToProps(state) {
    return {
        currentUser: state.applicationSignInReducer.currentUser,
        isProgressing: state.applicationSignInReducer.isProgress,
        isError: state.applicationSignInReducer.isError,
        errorText: state.applicationSignInReducer.errorText
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(loginRequestAsync(dataObj)),
        closeAlert: () => dispatch(loginErrorAlert())
    }
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        console.log(this.props);
    }
    register = () => {
        browserHistory.push('/signup');
    }
    updateValue = (ev, target) => {

        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    signIn = () => {
        let obj = {
            email: this.state.email,
            password: this.state.password
        }
        if (obj.email.trim() !== "" & obj.password.trim() !== "") {
            this.props.signInUser(obj);
        }
    }
    keyPress = (e) => {
        if (e.key === "Enter") {
            let obj = {
                email: this.state.email,
                password: this.state.password
            }
            if (obj.email.trim() !== "" & obj.password.trim() !== "") {
                this.props.signInUser(obj);
            }
        }
    }
    dispatchClose = () => {
        this.props.closeAlert();
    }
    render() {
        console.log('Progressing in LOGIN: ', this.props.isProgressing);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />

                {
                    this.props.isProgressing ? (
                        <CircularProgress style={{ margin: '50%' }} size={80} thickness={5} />
                    )
                        :
                        <div style={style.paperWapper}>
                            <div>
                                <h1 style={style.heading}>Login</h1>
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'email') }}
                                    value={this.state.email}
                                    style={style.textStyle}
                                    type='email'
                                    hintText=""
                                    floatingLabelText="Email*"
                                /><br />
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'password') }}
                                    value={this.state.password}
                                    style={style.textStyle}
                                    type='password'
                                    hintText=""
                                    floatingLabelText="Password"
                                    onKeyPress={this.keyPress}
                                /><br />
                                <RaisedButton onClick={this.signIn} label="Login" primary={true} style={style.button} />
                                <RaisedButton onClick={this.register} label="Register" primary={true} style={style.button} />
                            </div>
                        </div>
                }
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
