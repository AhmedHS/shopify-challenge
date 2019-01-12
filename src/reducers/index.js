import data from '../resources/swm_waste_wizard_APR.json';

let defaultState = {
    tempState: 'test',
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'TEST':
            console.log(data);
            return{
                ...state
            }
        default: return state;
    }
}

export default reducers;