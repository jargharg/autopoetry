import axios from "axios"

export const POEM_SEARCH = "poem_search"
export const POEM_EDIT = "poem_edit"

const ROOT_URL = "https://content.guardianapis.com/search?show-fields=body&q="
const API_KEY = "&api-key=2c7e590d-dde8-498a-b351-b008c42edf52"

export function poemSearch(term) {
    const request = axios
        .get(ROOT_URL + term + API_KEY)

    return {
        type: POEM_SEARCH,
        payload: {
            title: term,
            data: request.data
        }
    }
}

export function poemEdit(editMode) {
    return {
        type: POEM_EDIT,
        payload: editMode
    }
}
