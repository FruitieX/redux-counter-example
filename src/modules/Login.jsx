import React, { PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import CircularProgress from 'material-ui/CircularProgress';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import Account from 'material-ui/svg-icons/action/account-circle';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateIntl } from 'react-intl-redux';

import { getLocaleForUser, languages } from '../utils/intl';
import rest from '../utils/rest';
import theme from '../utils/theme';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.email.focus();
  }

  shouldComponentUpdate(props) {
    if (props.auth.data && props.auth.data.token) {
      this.authSuccess();
      return false;
    }

    return true;
  }

  authSuccess() {
    let redirect = this.props.redirectPath;

    if (!redirect || redirect === '/logout') {
      redirect = '/';
    }

    this.props.redirect(redirect);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    const { auth } = this.props;

    const loading = false;

    const spinner = loading ? <CircularProgress /> : null;

    return (
      <div
        style={{
          textAlign: 'center',
          margin: theme.spacing.desktopGutter,
        }}
      >
        <div
          style={{
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'center',
            margin: theme.spacing.desktopGutter,
          }}
        >
          <Card
            style={{
              flex: 1,
              maxWidth: '350px',
            }}
          >
            <CardHeader
              title="frontend-hipster-kit"
              subtitle="Please log in:"
              style={{
                backgroundColor: theme.palette.primary1Color,
              }}
              titleStyle={{
                color: theme.palette.alternateTextColor,
              }}
              subtitleStyle={{
                color: theme.palette.accent2Color,
              }}
            />
            <div style={{ textAlign: 'center', marginTop: theme.spacing.desktopGutter }}>
              <Account
                style={{
                  height: '100px',
                  width: '100px',
                  textAlign: 'center',
                  color: theme.palette.primary3Color,
                }}
              />
            </div>
            <CardText>
              <TextField
                ref={(c) => { this.email = c; }}
                type="text"
                floatingLabelText="Email"
                hintText="Enter your email"
                fullWidth
                onChange={(event) => {
                  if (event.keyCode !== 13) {
                    this.handleChange(event, 'email');
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    this.props.doLogin({ email: this.state.email, password: this.state.password });
                  }
                }}
              />
              <TextField
                type="password"
                floatingLabelText="Password"
                hintText="Password"
                fullWidth
                onChange={(event) => {
                  if (event.keyCode !== 13) {
                    this.handleChange(event, 'password');
                  }
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    this.props.doLogin({ email: this.state.email, password: this.state.password });
                  }
                }}
              />
            </CardText>
            <CardText
              style={{
                textAlign: 'center',
              }}
            >
              {!auth.error && auth.data && auth.data.message ? String(`Note: ${auth.data.message}`) : ''}
              {auth.error && auth.error.message ? String(`Error: ${auth.error.message}`) : ''}
            </CardText>
            <CardActions
              style={{
                margin: theme.spacing.desktopGutter,
                marginTop: '0px',
              }}
            >
              <RaisedButton
                disabled={
                loading || !this.state.email.length || !this.state.password.length
              } label="Login" fullWidth primary onTouchTap={() => this.props.doLogin({ email: this.state.email, password: this.state.password })}
              />
            </CardActions>
          </Card>
        </div>
        {spinner}
      </div>
    );
  }
}

Login.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  doLogin: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    sync: PropTypes.bool,
    syncing: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
};

export default withRouter(connect(
  (state, ownProps) => ({
    auth: state.auth,
    redirectPath: ownProps.location.state
      ? ownProps.location.state.from.pathname
      : '/',
  }),
  (dispatch, ownProps) => ({
    doLogin(creds) {
      dispatch(rest.actions.auth({}, { body: JSON.stringify(creds) }));

      const storedLocale = getLocaleForUser(creds.email);
      if (storedLocale && languages[storedLocale]) {
        dispatch(updateIntl({
          locale: storedLocale,
          messages: languages[storedLocale].translations,
        }));
      }
    },
    redirect(path) {
      ownProps.replace(path);
    },
  }),
)(Login));
