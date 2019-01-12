import data from '../resources/swm_waste_wizard_APR.json';

let defaultState = {
    results: [],
}

const reducers = (state = defaultState, action) => {
    switch(action.type) {
        case 'SUBMIT':
            let newResults = data.filter((entry) => {
                return entry.keywords.includes(action.payload);
            })
            return {
                ...state, results: newResults
            }
        default: return state;
    }
}

export default reducers;