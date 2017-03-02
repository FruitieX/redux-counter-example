import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';

import { List, ListItem, ListItemText } from 'material-ui/List';
import { Menu, MenuItem } from 'material-ui/Menu';
import Text from 'material-ui/Text';

import Button from 'material-ui/Button';

import {
  CardContent,
} from 'material-ui/Card';

import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux';

import { clearState } from '../utils/persist';

import { languages, storeLocaleForUser } from '../utils/intl';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

class Preferences extends React.Component {
  static propTypes = {
    activeLanguage: PropTypes.string.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      scope: PropTypes.string.isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    changeLanguage: PropTypes.func.isRequired,
    doClearState: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: {
      email: 'Default user',
      scope: 'user',
    },
  };

  state = {
    languageMenuOpen: false,
    languageMenuAnchor: null,
  };

  render() {
    const {
      activeLanguage,
      changeLanguage,
      doClearState,
      user,
      intl: { formatMessage },
    } = this.props;

    return (
      <CardWrapper>
        <ResponsiveCard>
          <CardContent>
            <Text type="headline">{formatMessage({ id: 'language' })}</Text>
            <List>
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="language-menu"
                aria-label="App language"
                onClick={e => this.setState({
                  languageMenuOpen: true,
                  languageMenuAnchor: e.currentTarget,
                })}
              >
                <ListItemText
                  primary={formatMessage({ id: 'selectedLanguage' })}
                  secondary={languages[activeLanguage] ? languages[activeLanguage].name : 'unknown'}
                />
              </ListItem>
            </List>
            <Menu
              id="language-menu"
              anchorEl={this.state.languageMenuAnchor}
              open={this.state.languageMenuOpen}
              onRequestClose={() => this.setState({ languageMenuOpen: false })}
            >
              {
                Object.keys(languages).map(language => (
                  <MenuItem
                    key={language}
                    selected={language === activeLanguage}
                    onClick={() => {
                      changeLanguage(user, language);
                      this.setState({ languageMenuOpen: false });
                    }}
                  >
                    {languages[language].name}
                  </MenuItem>
                ))
              }
            </Menu>
          </CardContent>
          <CardContent>
            <Text type="headline">{formatMessage({ id: 'resetState' })}</Text>
            <Text>{formatMessage({ id: 'resetStateExplanation' })}</Text>
          </CardContent>
          <CardContent>
            <Button
              raised
              accent
              onClick={doClearState}
            >
              {formatMessage({ id: 'resetStateButton' })}
            </Button>
          </CardContent>
        </ResponsiveCard>
      </CardWrapper>
    );
  }
}

export default injectIntl(connect(
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
)(Preferences));
