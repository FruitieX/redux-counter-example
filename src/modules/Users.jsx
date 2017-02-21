import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import rest from '../utils/rest';

// We need to use a 'stateful' component here, because we want to refresh the
// user list whenever this component is mounted (ie. user navigates to this view)

// Functional vs Class Components:
// https://facebook.github.io/react/docs/components-and-props.html
// http://stackoverflow.com/questions/36097965/react-when-to-use-es6-class-based-components-vs-functional-es6-components
class Users extends React.Component {
  componentDidMount() {
    const { refresh } = this.props;

    refresh();
  }

  render() {
    const { users, intl: { formatMessage } } = this.props;

    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>{formatMessage({ id: 'userId' })}</TableHeaderColumn>
              <TableHeaderColumn>{formatMessage({ id: 'email' })}</TableHeaderColumn>
              <TableHeaderColumn>{formatMessage({ id: 'description' })}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              // Loop over each user and render a <TableRow>
              users.map(user => (
                <TableRow key={user.id} selectable>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.description}</TableRowColumn>
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
