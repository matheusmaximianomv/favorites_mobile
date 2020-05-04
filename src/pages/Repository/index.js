import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import { Container } from './styles';

class Repository extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params.repository.name,
  });

  componentDidMount() {
    const { props } = this;

    console.tron.log(props);
  }

  render() {
    const {
      route: {
        params: { repository },
      },
    } = this.props;

    return (
      <Container>
        <WebView source={{ uri: repository.html_url }} />
      </Container>
    );
  }
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.shape({
        name: PropTypes.string,
        html_url: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Repository;
