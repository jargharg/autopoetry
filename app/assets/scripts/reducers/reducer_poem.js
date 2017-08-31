import { POEM_SEARCH } from "../actions"

export default function(state = {appState: "search"}, action) {
    switch (action.type) {
        case POEM_SEARCH:
            return {...state, appState: "poem", searchTerm: action.payload}
        default:
            return state
    }
}
