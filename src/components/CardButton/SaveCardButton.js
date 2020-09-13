import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class SaveCardButton extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>Guardar</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

SaveCardButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
