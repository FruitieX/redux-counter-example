import React, { PropTypes } from 'react';

import DropDownMenu from 'material-ui-old/DropDownMenu';
import MenuItem from 'material-ui-old/MenuItem';
import Button from 'material-ui/Button';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui-old/Card';

import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux';

import { clearState } from '../utils/persist';

import theme from '../utils/theme';
import { languages, storeLocaleForUser } from '../utils/intl';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing.desktopGutter,
  },
  card: {
    margin: theme.spacing.desktopGutter,
    flex: 1,
    flexBasis: '450px',
  },
};

const Preferences = ({ activeLanguage, changeLanguage, doClearState, user }) => (
  <div style={styles.wrapper}>
    <Card style={styles.card}>
      <CardTitle
        title={<FormattedMessage id="language" />}
      />
      <CardText>
        <DropDownMenu
          value={activeLanguage}
          onChange={(event, index, locale) => changeLanguage(user, locale)}
        >
          {
            Object.keys(languages).map(language => (
              <MenuItem key={language} value={language} primaryText={languages[language].name} />
            ))
          }
        </DropDownMenu>
      </CardText>
      <CardTitle
        title={<FormattedMessage id="resetState" />}
        subtitle={<FormattedMessage id="resetStateExplanation" />}
      />
      <CardText>
        <Button
          raised
          accent
          onTouchTap={doClearState}
        >
          {<FormattedMessage id="resetStateButton" />}
        </Button>
      </CardText>
    </Card>
  </div>
);

Preferences.propTypes = {
  activeLanguage: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,
  }).isRequired,
  changeLanguage: PropTypes.func.isRequired,
  doClearState: PropTypes.func.isRequired,
};

Preferences.defaultProps = {
  user: {
    email: 'Default user',
    scope: 'user',
  },
};

export default connect(
  state => ({
    activeLanguage: state.intl.locale,
    // TODO: get rid of this jwtDecode()
    user: state.auth.data.token && jwtDecode(state.auth.data.token),
  }),
  dispatch => ({
    changeLanguage: (user, locale) => {
      storeLocaleForUser(user.email, locale);
      dispatch(updateIntl({
        locale,
        messages: languages[locale].translations,
      }));
    },
    doClearState: () => {
      clearState(true);

      // reload app
      location.reload();
    },
  }),
)(Preferences);
