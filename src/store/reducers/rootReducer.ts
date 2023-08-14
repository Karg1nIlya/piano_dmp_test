import { combineReducers } from "redux";
import { boardReducer } from "./boardsReducer";

export const rootReducer = combineReducers({
    update: boardReducer
})

export type RootState = ReturnType<typeof rootReducer> //для того, чтобы выводились подсказки при работе с store в компонентах