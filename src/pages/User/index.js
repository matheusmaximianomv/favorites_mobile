import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  RepositoryButton,
  Title,
  Author,
} from './styles';

class User extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params.user.name,
  });

  state = {
    stars: [],
    loading: false,
    loadingRolling: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { route } = this.props;
    const { page } = this.state;

    const response = await api.get(
      `/users/${route.params.user.login}/starred?page=${page}`
    );

    this.setState({ stars: response.data, loading: false });
  }

  componentWillUnmount() {
    this.setState({ stars: [] });
  }

  handleRolling = async () => {
    this.setState({ loadingRolling: true });

    const { route } = this.props;
    const { page, stars } = this.state;

    const response = await api.get(
      `/users/${route.params.user.login}/starred?page=${page + 1}`
    );

    if (!response.data) {
      this.setState({
        loadingRolling: false,
      });

      return;
    }

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loadingRolling: false,
    });
  };

  handleNavigation = (item) => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository: item });
  };

  refreshList = async () => {
    this.setState({ refreshing: true });

    const { route } = this.props;

    const response = await api.get(
      `/users/${route.params.user.login}/starred?page=${1}`
    );

    this.setState({ stars: response.data, refreshing: false, page: 1 });
  };

  render() {
    const { stars, loading, loadingRolling, refreshing } = this.state;
    const {
      route: {
        params: { user },
      },
    } = this.props;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading size={50} />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.handleRolling}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
                <RepositoryButton onPress={() => this.handleNavigation(item)}>
                  <Icon name="keyboard-arrow-right" size={25} color="#7159c1" />
                </RepositoryButton>
              </Starred>
            )}
          />
        )}
        {loadingRolling && <Loading size={25} />}
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        login: PropTypes.string,
        bio: PropTypes.string,
        avatar: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default User;
