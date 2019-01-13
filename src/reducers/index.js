import data from '../resources/swm_waste_wizard_APR.json';

let defaultState = {
    results: [],
    favourites: [], //stores list of favourite items
}

const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SUBMIT':
            let newResults = data.filter((entry) => {
                return entry.keywords.includes(action.payload);
            })
            return {
                ...state, results: newResults
            }
        case 'CLEAR':
            return{...state, results: []}
        case 'FAVOURITE':
            let favQuery;
            state.favourites.forEach((result, index) => { //Searches to see if the item is already favourited
                if(result.title == action.payload)
                    favQuery = index;
            })
            if(favQuery != undefined){ //If so, removes it from the favourite list
                let newFav = [...state.favourites]
                newFav.splice(favQuery, 1)
                return {
                    ...state, favourites: newFav
                }}
            else{ //Adding an item tot he favourite list
                let query = data.filter((result) => {
                    if(result.title === action.payload)
                        return result;
                })
                return {
                    ...state, favourites: [...state.favourites, query[0]]
                }
            }            
        default: return state;
    }
}

export default reducers;