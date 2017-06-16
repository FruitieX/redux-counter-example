import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import isArray from 'lodash/isArray';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('SimpleMediaCard', {
  mobileContainer: {
    marginTop: 12,
    paddingBottom: 12,
  },
  desktopContainer: {
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
  },
  desktopGrid: {
    maxWidth: '70%',
  },
});

@withStyles(styleSheet)
export default class CardGridWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line
    classes: PropTypes.object.isRequired,
  }

  renderChildDesktop = (component, index) => (
    <Hidden key={index} xsDown>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        { component }
      </Grid>
    </Hidden>
  );

  renderChildMobile = (component, index) => (
    <Hidden key={index} smUp>
      <Grid item xs={12}>
        { component }
      </Grid>
    </Hidden>
  );

  render() {
    const { children, classes } = this.props;

    // Justify center if only one card provided
    const desktopJustify = isArray(children) ? 'flex-start' : 'center';

    return (
      <div>
        <Hidden xsDown>
          <div className={classes.desktopContainer}>
            <Grid container justify={desktopJustify} className={classes.desktopGrid}>
              { isArray(children)
                ? children.map(this.renderChildDesktop)
                : this.renderChildDesktop(children)
              }
            </Grid>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={classes.mobileContainer}>
            <Grid container>
              { isArray(children)
                ? children.map(this.renderChildMobile)
                : this.renderChildMobile(children)
              }
            </Grid>
          </div>
        </Hidden>
      </div>
    );
  }
}
