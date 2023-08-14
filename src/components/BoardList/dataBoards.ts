import { IBoards } from "../../models/ITask";

export const status = new Map();
status.set("Waiting", "waiting");    
status.set("In progress", "in_progress");     
status.set("Done", "done");

export const initialState: IBoards[] = [
    {title: 'Waiting', tasks: []},
    {title: 'In progress', tasks: []},
    {title: 'Done', tasks: []}
]
