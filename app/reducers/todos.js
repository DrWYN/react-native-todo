import {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETE, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/ActionTypes'

const initState = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
]

export default function todos(state = initState, action) {
    switch (action.type){
        case ADD_TODO:
            return [
            {
                id: state.reduce((maxId, todo) => Math.max(todo.id,maxId),-1) + 1,
                completed: false,
                text: action.text
            },
            ...state
            ]
        break;
        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.id
              );
        break;
        case EDIT_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                  Object.assign({}, todo, { text: action.text }) :
                  todo
              )
        break;
        case COMPLETE_TODO:
            return state.map((todo) => 
                todo.id === action.id ? 
                Object.assign({},todo,{completed: !todo.completed}) : todo
            );
        break;
        case COMPLETE_ALL:
            const areAllMarked = state.every((todo) => todo.completed);
            return state.map((todo) => 
                Object.assign({}, todo, {completed: !areAllMarked})
            );
        break;
        case CLEAR_COMPLETE:
            return state.filter((todo) => 
                todo.completed === false
            );
        break;
        // case SHOW_ALL:
        //     return state.filter(() => true);
        // break;
        // case SHOW_ACTIVE:
        //     return state.filter((todo) => !todo.completed);
        // break;
        // case SHOW_COMPLETED:
        //     return state.filter((todo) => todo.completed);
        // break;
        default:
            return state;
        break;
    }
}