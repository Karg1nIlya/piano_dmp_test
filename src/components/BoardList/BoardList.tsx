import React, { useEffect, useState } from "react";
import { IBoards, ITask, ITaskDTO } from "../../models/ITask";
import { Board } from "../Board/Board";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchTasks, rallback, showLoader, update } from "../../store/actions/boardsActions";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../store/types/board";
import { initialState, status } from "./dataBoards";
import { Alert } from "../Alert/Alert";

import "./boardList.css";

export function BoardList() {
    const state = useTypedSelector(state => state.update)
    const [boards, setBoards] = useState<IBoards[]>(initialState);
    const [currentBoard, setCurrentBoard] = useState<IBoards|null>(null)
    const [currentTask, setCurrentTask] = useState<ITask|null>(null)
    const [alertVisible, setAlertVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(showLoader(actionTypes.SHOW_LOADER));
        const res = fetchTasks(actionTypes.GET_TASKS);
        res.then(e => {
                filterTasks(e.payload);
                dispatch(e);
            }
        )
        .catch(() => {
            setAlertVisible(true);
            setTimeout(() => {setAlertVisible(false)}, 3000);
            dispatch({type: actionTypes.GET_TASKS, payload: initialState});
        }) 
    },[])

    const filterTasks = (arr: ITask[]) => {
        boards[0].tasks = arr.filter(el=>el.status==='waiting');
        boards[1].tasks = arr.filter(el=>el.status==='in_progress');
        boards[2].tasks = arr.filter(el=>el.status==='done');
    }

    const onUpdate = async (board: IBoards, task: ITask) => {
        if (currentBoard?.title === 'Waiting' &&  board.title === 'Done') {
            return ;
        } else {
            const currentIndex = currentBoard?.tasks.indexOf(currentTask!);
            currentBoard!.tasks.splice(currentIndex!, 1);
            const dropIndex = board.tasks.indexOf(task);
            board.tasks.splice(dropIndex+1, 0, currentTask!);
    
            setBoards(boards.map(b => {
                if (b.title === board.title) {
                    return board;
                }
                if (b.title === currentBoard?.title) {
                    return currentBoard;
                }
                return b;
            }))
            try {
                currentTask!.status = status.get(board.title);
                const taskDTO: ITaskDTO = {
                    id: currentTask!.id,
                    status: currentTask!.status
                };
                const res = await update(actionTypes.UPDATE, {taskDTO});
                dispatch(res);
            } catch (error) {
                dispatch(rallback(actionTypes.RALLBACK, {task:currentTask!, status: status.get(currentBoard?.title)}));
                filterTasks(state.tasks);
                setAlertVisible(true);
                setTimeout(() => {setAlertVisible(false)}, 3000);
            }
        }      
    }

    const onUpdateBoard = async (board: IBoards) => {
        if(currentBoard?.title === 'Waiting' &&  board.title === 'Done') {
            return ;
        } else {
            board.tasks.push(currentTask!);
            const currentIndex = currentBoard?.tasks.indexOf(currentTask!);
            currentBoard!.tasks.splice(currentIndex!, 1);
            setBoards(boards.map(b => {
                if (b.title === board.title) {
                    return board;
                }
                if (b.title === currentBoard?.title) {
                    return currentBoard;
                }
                return b;
            }))
            try {
                currentTask!.status = status.get(board.title);
                const taskDTO: ITaskDTO = {
                    id: currentTask!.id,
                    status: currentTask!.status
                };
                const res = await update(actionTypes.UPDATE, {taskDTO});
                dispatch(res);
            } catch (error) {
                console.log(error);
                dispatch(rallback(actionTypes.RALLBACK, {task:currentTask!, status: status.get(currentBoard?.title)}));
                filterTasks(state.tasks);
                setAlertVisible(true);
                setTimeout(() => {setAlertVisible(false)}, 3000);
            }
        }
    }

    return (
        <>
        {alertVisible && <Alert/>}
        <div className="board-list">
            {boards.map((el: IBoards)=>{
                return (
                    <Board 
                        data={el} 
                        onUpdate={onUpdate}
                        title={el.title}
                        onUpdateBoard={onUpdateBoard}
                        setCurrentBoard={setCurrentBoard}
                        setCurrentTask={setCurrentTask}
                        key={el.title}
                    />
                )
            })}
        </div>
        </>
    )
}
