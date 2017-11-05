import ReduxThunk from "redux-thunk"
import { parseData, chooseLines, randomLineIndex } from "../utils/poemMethods"
import axios from "axios"

export const POEM_SEARCH = "poem_search"
export const POEM_LOADING = "poem_loading"
export const POEM_EDIT = "poem_edit"
export const POEM_REFRESH = "poem_refresh"
export const LINE_REFRESH = "line_refresh"
export const HISTORY_EDIT = "history_edit"

const ROOT_URL = "https://content.guardianapis.com/search?show-fields=body&q="
const API_KEY = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"

export function poemSearch(input) {
    return dispatch => {
        // show loading animation
        dispatch(function() {
            return {
                type: POEM_LOADING
            }
        })

        const title = input.replace(/\?/g, "")
        let APIterm = input.replace(/ /g, " AND ")
        let parsedData = {}

        // call to API with AND search term
        return axios.get(ROOT_URL + APIterm + API_KEY).then(function(response) {
            if (Number(response.data.response.total) > 0) {
                parsedData = parseData(response.data)
                dispatch(poemPayload(title, parsedData))
            } else {
                // if no results for AND search, try OR
                APIterm = APIterm.replace(/ AND /g, " OR ")
                axios
                    .get(ROOT_URL + APIterm + API_KEY)
                    .then(function(response) {
                        if (Number(response.data.response.total) > 0) {
                            parsedData = parseData(response.data)
                            dispatch(poemPayload(title, parsedData))
                        } else {
                            // if no results for AND or OR search
                            // return "no results found"
                        }
                    })
            }
        })
    }
}

export function refreshLine(lineIndex) {
    return (dispatch, getState) => {
        const currentPoem = getState().poem
        const poemLines = currentPoem.lines
        const newLine = randomLineIndex(currentPoem.lines)
        let newChosenLines = [...currentPoem.chosenLines]
        newChosenLines[lineIndex] = newLine

        dispatch(poemRefreshPayload(newChosenLines, currentPoem.chosenLines))
    }
}

export function refreshPoem() {
    return (dispatch, getState) => {
        const currentPoem = getState().poem
        const newChosenLines = chooseLines(currentPoem.lines)

        dispatch(poemRefreshPayload(newChosenLines, currentPoem.chosenLines))
    }
}

export function editPoem() {
    return {
        type: POEM_EDIT
    }
}

export function editHistory(direction) {
    return (dispatch, getState) => {
        console.log(direction)
        const currentPoem = getState().poem
        const currentChosenLines = currentPoem.chosenLines
        let prev, next, newChosenLines

        if (direction === "undo") {
            next = [currentChosenLines, ...currentPoem.history.next]
            prev = currentPoem.history.prev
            newChosenLines = prev.pop()
        } else if (direction === "redo") {
            prev = [...currentPoem.history.prev, currentChosenLines]
            next = currentPoem.history.next
            newChosenLines = next.shift()
        }

        dispatch({
            type: HISTORY_EDIT,
            payload: {
                newChosenLines,
                newHistory: { prev, next }
            }
        })
    }
}

//////////////////////////////////
//      PRIVATE FUNCTIONS       //
//////////////////////////////////

function poemPayload(title, lines) {
    return {
        type: POEM_SEARCH,
        payload: {
            title: title,
            lines: lines,
            chosenLines: chooseLines(lines)
        }
    }
}

function poemRefreshPayload(chosenLines, previousLines) {
    return {
        type: POEM_REFRESH,
        payload: {
            chosenLines,
            previousLines
        }
    }
}
