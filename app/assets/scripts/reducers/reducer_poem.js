import {
    POEM_SEARCH,
    POEM_LOADING,
    POEM_EDIT,
    POEM_REFRESH,
    HISTORY_EDIT,
    SHARE
} from "../actions"

export default function(state = { appState: "search" }, action) {
    switch (action.type) {
        case POEM_SEARCH:
            return {
                ...state,
                appState: "poem",
                title: action.payload.title,
                lines: action.payload.lines,
                chosenLines: action.payload.chosenLines,
                history: {prev: [], next: []},
                editMode: false
            }
        case POEM_LOADING:
            return {
                ...state,
                appState: "loading"
            }
        case POEM_EDIT:
            return {
                ...state,
                editMode: !state.editMode
            }
        case POEM_REFRESH:
            return {
                ...state,
                chosenLines: action.payload.chosenLines,
                history: {prev: [...state.history.prev, action.payload.previousLines], next: []}
            }
        case HISTORY_EDIT:
            return {
                ...state,
                chosenLines: action.payload.newChosenLines,
                history: action.payload.newHistory
            }
        case SHARE:
            return {
                ...state,
                escapedText: action.payload.escapedText
            }
        default:
            return state
    }
}
