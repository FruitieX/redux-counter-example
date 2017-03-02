import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Button from 'material-ui/Button';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';

import Icon from 'material-ui/Icon';

import { DialogContentText } from 'material-ui/Dialog';
import DialogWithButtons from '../components/DialogWithButtons';

import rest from '../utils/rest';

// We need to use a 'stateful' component here, because we want to refresh the
// user list whenever this component is mounted (ie. user navigates to this view)

// Also, in this component's state we keep track of whether the details dialog should be open.

// Functional vs Class Components:
// https://facebook.github.io/react/docs/components-and-props.html
// http://stackoverflow.com/questions/36097965/react-when-to-use-es6-class-based-components-vs-functional-es6-components
class Users extends React.Component {

  // Here we specify which props the component requires. This is especially useful in larger
  // projects. When someone else uses your component and if they forget to pass a required prop,
  // React will warn the developer through the console.

  // See https://facebook.github.io/react/docs/typechecking-with-proptypes.html for more info.
  static propTypes = {
    users: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    userDetails: PropTypes.shape({
      data: PropTypes.object.isRequired,
    }).isRequired,
    refresh: PropTypes.func.isRequired,
    refreshUser: PropTypes.func.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  // Component initial state
  state = {
    dialogOpen: false,
  };

  // Ran when component is first mounted, i.e. has rendered for the first time
  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  render() {
    const { users, refreshUser, userDetails, intl: { formatMessage } } = this.props;
    const { dialogOpen } = this.state;

    // Show the following user details in the dialog
    const userDetailsDescription = (
      <div>
        <DialogContentText>
          <b>{ formatMessage({ id: 'userId' })}</b>{`: ${userDetails.data.id}` }
        </DialogContentText>
        <DialogContentText>
          <b>{ formatMessage({ id: 'email' })}</b>{`: ${userDetails.data.email}` }
        </DialogContentText>
        <DialogContentText>
          <b>{ formatMessage({ id: 'description' })}</b>{`: ${userDetails.data.description}` }
        </DialogContentText>
      </div>
    );

    return (
      <div>
        <DialogWithButtons
          title={formatMessage({ id: 'userDetails' })}
          description={userDetailsDescription}
          submitAction={formatMessage({ id: 'close' })}
          isOpen={dialogOpen}
          loading={userDetails.loading}
          submit={() => this.setState({ dialogOpen: false })}
          close={() => this.setState({ dialogOpen: false })}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{formatMessage({ id: 'userId' })}</TableCell>
              <TableCell>{formatMessage({ id: 'email' })}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // Loop over each user and render a <TableRow>
              users.data.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell numeric>
                    <Button
                      primary
                      onClick={() => {
                        refreshUser(user);
                        this.setState({ dialogOpen: true });
                      }}
                    >
                      <Icon style={{ paddingRight: 10 }}>list</Icon>
                      {formatMessage({ id: 'showUserDetails' })}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

// Here we 'connect' the component to the Redux store. This means that the component will receive
// parts of the Redux store as its props. Exactly which parts is chosen by the first function (
// receives `state` as parameter).

// We should map only necessary values as props, in order to avoid unnecessary re-renders. In this
// case we need the list of users, as returned by the REST API. The component will be able to access
// the users list via `this.props.users`. Additionally, we need details about the selected user,
// which will be available as `this.props.userDetails`.

// The second function (receives `dispatch` as parameter) allows us to 'make changes' to the Redux
// store, by dispatching Redux actions. The functions we define here will be available to the
// component as props, so in our example the component will be able to call `this.props.refresh()`
// in order to refresh the users list, and `this.props.refreshUser(user)` to fetch more info about a
// specific user.

// More details: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default injectIntl(connect(
  state => ({
    users: state.users,
    userDetails: state.userDetails,
  }),
  dispatch => ({
    refresh: () => {
      dispatch(rest.actions.users());
    },
    refreshUser: (user) => {
      dispatch(rest.actions.userDetails({ userId: user.id }));
    },
  }),
)(Users));
