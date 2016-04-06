'use strict';

import React, {
    AppRegistry,
    Component,
    Proptypes,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableOpacity,
} from 'react-native'

import CheckBox from '../components/CheckBox';

import HeaderView from './HeaderView';
import RowView from './RowView';
import FooterView from './FooterView';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/ActionTypes'

const phone_width = Dimensions.get('window').width;
const phone_height = Dimensions.get('window').height;

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class MainView extends Component {
    constructor(props){
        super(props);
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            filter: SHOW_ALL,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              })
        }
        this._renderRow = this._renderRow.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    _renderRow(data: Object,sectionID: number, rowID: number) {
        return(
            <RowView 
                todo={data}
                actions={this.props.actions}/>
            );
    }

    _renderHeader() {
        const {actions, todos} = this.props;
        return (
            <HeaderView actions={actions} todos={todos}/>
        );
    }

    renderContent(dataSource) {
        let listView = 
            <ListView 
              automaticallyAdjustContentInsets={false}
              dataSource={dataSource}
              renderRow={this._renderRow}
              renderHeader={this._renderHeader}/>;
        return listView;
    }
    _filterActive() {
        this.setState({filter: SHOW_ACTIVE});
    }
    _filterCompleted() {
        this.setState({filter: SHOW_COMPLETED});
    }
    _filterAll() {
        this.setState({filter: SHOW_ALL});
    }

    render(){
        const {todos, actions} = this.props;
        console.log(todos);
        const { filter } = this.state
        const filteredTodos = todos.filter(TODO_FILTERS[filter])

        return(
            <View style={styles.container}>
                {this.renderContent(this.state.dataSource.cloneWithRows(filteredTodos))}
                <FooterView 
                    todos={todos} 
                    actions={actions}
                    filter={filter}
                    filterActive={this._filterActive.bind(this)}
                    filterCompleted={this._filterCompleted.bind(this)}
                    filterAll={this._filterAll.bind(this)}/>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: phone_height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    headerBody: {
        marginBottom:10,
        backgroundColor: '#ffffff',
    },
});