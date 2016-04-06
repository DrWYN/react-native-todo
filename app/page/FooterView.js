'use strict';

import React, {
    AppRegistry,
    Component,
    Proptypes,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
} from 'react-native'

import Button from '../components/Button';

const phone_width = Dimensions.get('window').width;

export default class FooterView extends Component {
    _clearComplete(){
        this.props.actions.clearCompleted();
    }

    render(){
        const {todos,filter} = this.props;
        const completedCount = todos.reduce((count, todo) =>
          todo.completed ? count + 1 : count,
          0
        );
        const activeCount = todos.length - completedCount

        let allStyle =  filter === 'SHOW_ALL' ? {color: 'red'} : {color: 'grey'};
        let activeStyle =  filter === 'SHOW_ACTIVE' ? {color: 'red'} : {color: 'grey'};
        let completedStyle =  filter === 'SHOW_COMPLETED' ? {color: 'red'} : {color: 'grey'};

        return(
            <View style={styles.container}>
                <Text style={{flex: 0.2}}>{activeCount} left</Text>
                <Button 
                    style={{flex: 0.2}}
                    textStyle={activeStyle}
                    text="Active"
                    onPress={this.props.filterActive}/>
                <Button style={{flex: 0.3}} 
                    textStyle={completedStyle}
                    text="Completed"
                    onPress={this.props.filterCompleted}/>
                <Button style={{flex: 0.2}}
                    textStyle={allStyle}
                    text="All"
                    onPress={this.props.filterAll}/>
                <Button style={{flex: 0.3}}
                    text="Clear Completed"
                    onPress={this._clearComplete.bind(this)}/>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: phone_width,
        height: 40,
        padding: 5,
    },
});