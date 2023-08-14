import { IAction, actionTypes, initialState } from "../types/board"

export const boardReducer = (state = initialState, action: IAction) => {
    switch(action.type) {

        case actionTypes.SHOW_LOADER: {
            return {...state, loading: true};
        }

        case actionTypes.RALLBACK: {
            state.tasks.map(el => {
                if(el.id===action.payload.task.id) {
                    el.status = action.payload.status;
                }
                return el;
            })
            action.payload.task.id;
            return { ...state };
        }

        case actionTypes.GET_TASKS: {
            return {tasks: action.payload, loading: false};
        }

        case actionTypes.UPDATE: {
            state.tasks.find(el => el.id === action.payload.taskDTO.id)!.status = action.payload.taskDTO.status;
            return { ...state };
        }

        default: {
            return state;
        }
    }
}