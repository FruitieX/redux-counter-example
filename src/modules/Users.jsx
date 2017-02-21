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

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  refresh: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

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
