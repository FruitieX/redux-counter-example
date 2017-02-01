import React from 'react'
import { connect } from 'react-redux'

import {
  Card,
  CardText,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';

import theme from '../utils/theme';
import HomeCard from '../components/HomeCard';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing.desktopGutter,
  },
};

const Home = ({ experts }) => (
  <div style={styles.wrapper}>
    <HomeCard
      title='Card 1 title'
      subtitle='Card 1 subtitle'
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc turpis leo, ultrices et mollis ac, eleifend ut ligula. Aenean porttitor ullamcorper urna, ac tincidunt justo hendrerit dapibus. Quisque dapibus posuere consequat. Pellentesque tristique, ex non rutrum consectetur, lacus nulla tempor odio, quis consequat diam ipsum quis erat.</p>
      <p>Donec est ante, efficitur eget cursus id, viverra sit amet diam.</p>
      <ul>
        <li>Nulla facilisi.</li>
        <li>Curabitur faucibus, nibh mollis porttitor mollis, tellus ligula blandit erat, sit amet tempor magna ligula vitae massa.</li>
        <li>Sed turpis leo, sodales auctor ex quis, vehicula iaculis augue. Donec condimentum consequat augue, in bibendum nisl cursus vulputate. Aenean faucibus ex nec ligula euismod, et euismod magna eleifend.</li>
      </ul>
    </HomeCard>
    <HomeCard
      title='Card 2 title'
      subtitle='Card 2 subtitle'
    >
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
    </HomeCard>
  </div>
)

Home.propTypes = {
  experts: React.PropTypes.array.isRequired,
}

export default connect(
  (state) => ({
    experts: state.experts.data,
  }),
  (dispatch) => ({
  }),
)(Home)
