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

import CheckBox from '../components/CheckBox';
import Button from '../components/Button';

const phone_width = Dimensions.get('window').width;

export default class HeaderView extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: null
        }
    }
    _checkBoxChanged(checked){
        console.log('_checkBoxChanged = '+checked);
        const {actions} = this.props;
        actions.completeAll();
    }
    _appendTodoList(){
        
        if(!this.state.text) return;

        const {actions} = this.props;
        actions.addTodo(this.state.text);
        console.log('_appendTodoList...'+ this.state.text);
        this.setState({text: null});
    }
    _renderToggleAll(completedCount){
        const { todos, actions } = this.props
        if (todos.length > 0) {
          return (
            <CheckBox
                    label=""
                    checked={completedCount === todos.length}
                    onChange={(checked) => {this._checkBoxChanged(checked)}}/>
          )
        }
    }
    render(){
        const {todos} = this.props;
        const completedCount = todos.reduce((count, todo) =>
          todo.completed ? count + 1 : count,
          0
        )
        return(
            <View style={styles.container}>
                {this._renderToggleAll(completedCount)}
                <TextInput
                        placeholder="写下你将要做的事"
                        multiline={true}
                        keyboardType='default'
                        onChangeText={(text) => this.setState({text:text})}
                        value={this.state.text}
                        style={styles.text_input}/>
                <Button
                    text="添加"
                    onPress={this._appendTodoList.bind(this)}/>           
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
    text_input: {
      flex:1,
    },
});
