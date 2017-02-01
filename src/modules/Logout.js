import React from 'react';
import { Component, PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

class Logout extends Component {
  componentDidMount() {
    this.props.doLogout();
  }

  render() {
    return(
      <div style={{
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '200px',
      }}>
        <CircularProgress />
      </div>
    );
  }
}

import { connect } from 'react-redux';

import { clearState } from '../utils/persist';

export default connect(
  (state) => ({}),
  (dispatch) => ({
    doLogout() {
      clearState();

      // reload app
      location.reload();
    }
  })
)(Logout);
