import { ITask } from "../../models/ITask";

export enum actionTypes {
    SHOW_LOADER = 'SHOW_LOADER',
    GET_TASKS = 'GET_TASKS',
    UPDATE = 'UPDATE',
    RALLBACK = 'RALLBACK'
}

export interface IState {
    tasks: ITask[];
    loading: boolean;
}

export interface IAction {
    type: string;
    payload?: any; 
}

export const initialState: IState = {
    tasks: [],
    loading: false,
}
