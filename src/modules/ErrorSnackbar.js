import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class ErrorSnackbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      message: ''
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message !== this.state.message) {
      this.setState({
        open: true,
        message: nextProps.message,
      })
    }
  }

  render() {
    const { errorMessage } = this.props;
    const { open, message } = this.state;

    return (<Snackbar
      open={ open }
      message={ message }
      autoHideDuration={ 4000 }
      onRequestClose={ this.handleRequestClose }
    />)
  }
}

import { connect } from 'react-redux';

export default connect(
  (state, ownProps) => ({
    errorMessage: state.err
  }),
  (dispatch) => ({
  })
)(ErrorSnackbar);

import {
  createAction,
  createReducer
} from 'redux-act';

// Action creators
export const showError = createAction('Show error message');

// Initial state
const initialState = {
  err: '',
  id: 0,
};

// Reducer
export const reducer = createReducer({
  [showError]: (state, payload) => ({
    err: payload,
    id: state.id + 1,
  }),
}, initialState);
