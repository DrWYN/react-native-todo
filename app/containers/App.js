'use strict';

import React, {
    AppRegistry,
    Component,
    PropTypes,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as TodoActions from '../actions'

import MainView from '../page/MainView'

export default class App extends Component {
    
    render(){
        const {todos, actions} = this.props;
        return(
            <View>
                <MainView 
                todos={todos} 
                actions={actions}/>
            </View>
        );
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    // body...
    return {
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch) {
    // body...
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
