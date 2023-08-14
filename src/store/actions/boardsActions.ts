import api from "../../../api/api";
import { ITask, ITaskDTO } from "../../models/ITask";

export const update = async (type: string, payload: {taskDTO: ITaskDTO}) => {
    await api.update(payload.taskDTO)
    return {
        type,
        payload
    }  
}

export const rallback = (type: string, payload: {task: ITask|null, status: string}) => {
    return {
        type, 
        payload
    }
}

export const showLoader = (type: string) => {
    return {
        type
    }
}

export const fetchTasks = async (type: string) => {
    const tasks = (await api.read()).tasks
    return {
        type,
        payload: tasks
    }
}
