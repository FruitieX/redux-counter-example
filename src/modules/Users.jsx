import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import DialogWithButtons from '../components/DialogWithButtons';

import rest from '../utils/rest';

const styles = {
  userDetail: {
    paddingTop: 10,
  },
};

// We need to use a 'stateful' component here, because we want to refresh the
// user list whenever this component is mounted (ie. user navigates to this view)

// Also, we want to keep track of which user is selected, so that the details dialog can show
// details about the correct user.

// Functional vs Class Components:
// https://facebook.github.io/react/docs/components-and-props.html
// http://stackoverflow.com/questions/36097965/react-when-to-use-es6-class-based-components-vs-functional-es6-components
class Users extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedUser: null,
      dialogOpen: false,
    };
  }

  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  render() {
    const { users, intl: { formatMessage } } = this.props;
    const { dialogOpen, selectedUser } = this.state;

    const userDetailsDescription = selectedUser ? (
      <div>
        <div style={styles.userDetail}> <b>{ formatMessage({ id: 'userId' })}</b>{`: ${selectedUser.id}` } </div>
        <div style={styles.userDetail}> <b>{ formatMessage({ id: 'email' })}</b>{`: ${selectedUser.email}` } </div>
        <div style={styles.userDetail}> <b>{ formatMessage({ id: 'description' })}</b>{`: ${selectedUser.description}` } </div>
      </div>
    ) : null;

    return (
      <div>
        <DialogWithButtons
          title={formatMessage({ id: 'userDetails' })}
          description={userDetailsDescription}
          submitAction={formatMessage({ id: 'close' })}
          isOpen={dialogOpen}
          submit={() => this.setState({ dialogOpen: false })}
          close={() => this.setState({ dialogOpen: false })}
        />
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>{formatMessage({ id: 'userId' })}</TableHeaderColumn>
              <TableHeaderColumn>{formatMessage({ id: 'email' })}</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              // Loop over each user and render a <TableRow>
              users.map(user => (
                <TableRow key={user.id} selectable>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label={formatMessage({ id: 'showUserDetails' })}
                      primary
                      onTouchTap={() => this.setState({ selectedUser: user, dialogOpen: true })}
                    />
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

// Here we specify which props the component requires. This is especially useful in larger projects.
// When someone else uses your component and if they forget to pass a required prop, React will
// warn the developer through the console.

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html for more info.
Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  refresh: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

// Here we 'connect' the component to the Redux store. This means that the component will receive
// parts of the Redux store as its props. Exactly which parts is chosen by the first function (
// receives `state` as parameter).

// We should map only necessary values as props, in order to avoid unnecessary re-renders.
// In this case we only need the list of users, as returned by the REST API. The component
// will be able to access the users list via `this.props.users`.

// The second function (receives `dispatch` as parameter) allows us to 'make changes' to the Redux
// store, by dispatching Redux actions. The functions we define here will be available to the
// component as props, so in our example the component will be able to call `this.props.refresh()`
// in order to refresh the users list.

// More details: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default injectIntl(connect(
  state => ({
    users: state.users.data,
  }),
  dispatch => ({
    refresh: () => {
      dispatch(rest.actions.users());
    },
  }),
)(Users));
