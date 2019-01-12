let defaultState = {
    tempState: 'test',
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'TEST':
            return{
                ...state
            }
        default: return state;
    }
}

export default reducers;