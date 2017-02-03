import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

import theme from '../utils/theme';
import { languages } from '../utils/intl'

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

const Preferences = ({ language, changeLanguage, clearState }) => (
  <div style={styles.wrapper}>
    <Card style={styles.card}>
      <CardTitle
        title='Language' />
      <CardText>
        <DropDownMenu value={ language } onChange={ changeLanguage }>
          {
            Object.keys(languages).map((language, index) => (
              <MenuItem key={index} value={language} primaryText={languages[language].name} />
            ))
          }
        </DropDownMenu>
      </CardText>
      <CardTitle
        title='Reset admin app state'
        subtitle='Use this if you experience problems with the admin app. Only affects your session.'/>
      <CardText>
        <RaisedButton label='Clear app state' secondary={true} onTouchTap={ clearState }/>
      </CardText>
    </Card>
  </div>
)

import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux'
import { clearState } from '../utils/persist';

export default connect(
  (state) => ({
    language: state.intl.locale
  }),
  (dispatch) => ({
    changeLanguage: (event, index, locale) => {
      dispatch(updateIntl({
        locale,
        messages: languages[locale].translations,
      }));
    },
    clearState: () => {
      clearState();

      // reload app
      location.reload();
    },
  }),
)(Preferences);
