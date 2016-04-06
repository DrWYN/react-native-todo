'use strict'

import React,{
    AppRegistry,
    Component,
    Proptypes,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native'

import CheckBox from '../components/CheckBox';
import Button from '../components/Button';

const phone_width = Dimensions.get('window').width;

export default class RowView extends Component {

    _checkBoxChanged(checked,id){
        console.log("_checkBoxChanged = "+checked);
        const {actions} = this.props;
        actions.completeTodo(id);
    }
    _deleteTodo(id){
        console.log("_deleteTodo id = "+id);
        const {actions} = this.props;
        actions.deleteTodo(id);
    }

    render(){
        const {todo} = this.props;
        console.log(todo);
        return (
            <View style={styles.container}>
                <CheckBox
                    label=""
                    checked={todo.completed}
                    onChange={(checked) => {this._checkBoxChanged(checked,todo.id)}}/>
                <Text style={{flex: 1}}>{todo.text}</Text>
                <Button
                    text="删除"
                    onPress={() => {this._deleteTodo(todo.id)}}/>  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: phone_width,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});