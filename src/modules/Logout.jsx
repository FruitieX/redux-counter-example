import React, { PropTypes } from 'react';

import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { clearState } from '../utils/persist';

class Logout extends React.Component {
  static propTypes = {
    doLogout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.doLogout();
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '200px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}

export default connect(
  undefined,
  () => ({
    doLogout() {
      clearState();

      // reload app
      location.pathname = '/';
    },
  }),
)(Logout);
