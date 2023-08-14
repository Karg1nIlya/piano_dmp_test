type TaskStatus = "waiting" | "in_progress" | "done";

export interface ITask {
    id: string;
    name: string;
    status: TaskStatus;
}


export interface IBoards {
    title: string;
    tasks: ITask[];

}

export interface ITaskDTO {
    id: string;
    status: TaskStatus;
}