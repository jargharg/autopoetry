import { combineReducers } from "redux"
import PoemReducer from "./reducer_poem"

const rootReducer = combineReducers({
    poem: PoemReducer
})

export default rootReducer
