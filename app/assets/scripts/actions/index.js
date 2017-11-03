import ReduxThunk from "redux-thunk"
import { parseData, chooseLines } from "../utils/poemMethods"
import axios from "axios"

export const POEM_SEARCH = "poem_search"
export const POEM_EDIT = "poem_edit"
export const POEM_LOADING = "poem_loading"

const ROOT_URL = "https://content.guardianapis.com/search?show-fields=body&q="
const API_KEY = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"

export function poemSearch(input) {
    return function action(dispatch) {
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

export function poemEdit(editMode) {
    return {
        type: POEM_EDIT,
        payload: editMode
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
