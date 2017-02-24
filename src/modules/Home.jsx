import React from 'react';

import {
  CardText,
  CardTitle,
  CardMedia,
} from 'material-ui/Card';

import CardWrapper from '../components/CardWrapper';
import ResponsiveCard from '../components/ResponsiveCard';

import theme from '../utils/theme';

import chilicorn from '../../assets/chilicorn/chilicorn_no_text-256.png';
import placeholder from '../../assets/placeholder.png';

const styles = {
  chilicornHeader: {
    height: 240,
    background: `url(${chilicorn})`,
    backgroundColor: theme.palette.primary3Color,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  loremHeader: {
    objectFit: 'cover',
    height: 240,
  },
};

const Home = () => (
  <CardWrapper>
    <ResponsiveCard>
      <CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      >
        <div style={styles.chilicornHeader} />
      </CardMedia>
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis, diam id dapibus
        auctor, augue urna bibendum ligula, id finibus est tortor vel dolor. Phasellus a nulla
        tellus. Phasellus augue ante, consequat vel condimentum eu, vulputate vitae nulla. Morbi ut
        finibus risus. Etiam gravida felis lectus, eu sagittis dolor auctor et. Vivamus nec leo non
        ligula tincidunt vulputate quis efficitur mi. In est eros, dignissim ut aliquet ut, ultrices
        eget nisi.
      </CardText>
    </ResponsiveCard>

    <ResponsiveCard>
      <CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      >
        <img src={placeholder} alt="Placeholder" style={styles.loremHeader} />
      </CardMedia>
      <CardText>
        Proin odio dolor, aliquet ac tellus sit amet, blandit venenatis massa. Phasellus id aliquet
        dui, eu rutrum lectus. Suspendisse hendrerit sollicitudin mauris, sed venenatis augue
        tristique et. Proin sed tortor lacinia, finibus diam eget, vulputate elit. Sed venenatis
        nunc nec urna molestie aliquet a at tortor. Proin dignissim diam ac turpis viverra auctor.
        Sed ac faucibus mauris, at consequat ipsum. Nunc cursus nunc id augue aliquet, sed vulputate
        nisl commodo.
      </CardText>
    </ResponsiveCard>
  </CardWrapper>
);

export default Home;
