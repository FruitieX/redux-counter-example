import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';

import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

import theme from '../utils/theme';
import { languages, storeLocaleForUser } from '../utils/intl'

import jwtDecode from 'jwt-decode'

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
  }
};

const Preferences = ({ language, changeLanguage, clearState, user }) => (
  <div style={styles.wrapper}>
    <Card style={styles.card}>
      <CardTitle
        title={<FormattedMessage id='language' />} />
      <CardText>
        <DropDownMenu value={ language } onChange={ (event, index, locale) => changeLanguage(user, locale) }>
          {
            Object.keys(languages).map((language, index) => (
              <MenuItem key={index} value={language} primaryText={languages[language].name} />
            ))
          }
        </DropDownMenu>
      </CardText>
      <CardTitle
        title={<FormattedMessage id='resetState' />}
        subtitle={<FormattedMessage id='resetStateExplanation' />} />
      <CardText>
        <RaisedButton label={<FormattedMessage id='resetStateButton' />} secondary={true} onTouchTap={ clearState }/>
      </CardText>
    </Card>
  </div>
)

import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux'
import { clearState } from '../utils/persist';

export default connect(
  (state) => ({
    language: state.intl.locale,
    user: jwtDecode(state.auth.data.token),
  }),
  (dispatch) => ({
    changeLanguage: (user, locale) => {
      storeLocaleForUser(user.name, locale);
      dispatch(updateIntl({
        locale,
        messages: languages[locale].translations,
      }));
    },
    clearState: () => {
      clearState(true);

      // reload app
      location.reload();
    },
  }),
)(Preferences);
