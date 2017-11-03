import { POEM_SEARCH, POEM_EDIT, POEM_LOADING } from "../actions"

export default function(state = { appState: "search" }, action) {
    switch (action.type) {
        case POEM_SEARCH:
            return {
                ...state,
                appState: "poem",
                title: action.payload.title,
                lines: action.payload.lines,
                chosenLines: action.payload.chosenLines
            }
        case POEM_LOADING:
            return {
                ...state,
                appState: "loading"
            }
        default:
            return state
    }
}
