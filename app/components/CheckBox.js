'use strict';

import React from 'react-native';
const {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  PropTypes
} = React;

const propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  labelBefore: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default class CheckBox extends React.Component{
  
  constructor(props){
    super(props);
    // this.state = {
    //   checked: this.props.checked
    // }
    this.onChange = this.onChange.bind(this);
  }

  onChange(){
    if(this.props.onChange){
      // this.setState({checked: !this.state.checked});
      this.props.onChange(!this.props.checked);
    }
  }

  render(){
    let source = this.props.checked ? require('../../images/cb_enabled.png') : require('../../images/cb_disabled.png');
    let container = this.props.labelBefore ? 
    (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
          </View>
          <Image
            style={styles.checkbox}
            source={source}/>
        </View>
      ) : (
      <View style={styles.container}>
        <Image
          style={styles.checkbox}
          source={source}/>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
        </View>
      </View>
    );

      return (
      <TouchableHighlight onPress={this.onChange} underlayColor='white'>
        {container}
      </TouchableHighlight>
    )
  }
}

CheckBox.propTypes = propTypes;

CheckBox.defaultProps = {
    label: 'Label',
    labelBefore: false,
    checked: false,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 26,
    height: 26
  },
  labelContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    color: 'grey',
  }
});