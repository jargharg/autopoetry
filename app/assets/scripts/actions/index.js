export const POEM_SEARCH = "poem_search"
export const POEM_EDIT = "poem_edit"


export function poemSearch(term) {
    return {
        type: POEM_SEARCH,
        payload: term
    }
}

export function poemEdit(editMode) {
    return {
        type: POEM_EDIT,
        payload: editMode
    }
}
