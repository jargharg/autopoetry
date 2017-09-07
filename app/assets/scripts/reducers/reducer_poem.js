import { POEM_SEARCH, POEM_EDIT } from "../actions"

export default function(state = { appState: "search" }, action) {
    switch (action.type) {
        case POEM_SEARCH:
            return {
                ...state,
                appState: "poem",
                title: action.payload.title,
                data: action.payload.data
            }
        default:
            return state
    }
}
