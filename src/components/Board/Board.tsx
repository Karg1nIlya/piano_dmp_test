import React from "react";
import "./board.css";
import { ITask } from "../../models/ITask";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IBoards {
    title: string;
    tasks: ITask[];
}

interface IBoard {
    data: IBoards;
    title: string;
    setCurrentBoard: (board: IBoards)=>void;
    setCurrentTask: (task: ITask)=>void;
    onUpdate: (board: IBoards, item: ITask)=>void;
    onUpdateBoard: (board: IBoards)=>void;
}

export function Board({data, onUpdate, title, onUpdateBoard, setCurrentBoard, setCurrentTask}: IBoard) {
    const state = useTypedSelector(state => state.update);

    function dragOverHandler(e: React.DragEvent<HTMLLIElement>): void {
        e.preventDefault();
        if (e.currentTarget.className === 'board-item') {
            e.currentTarget.style.boxShadow = '0 4px 3px gray';
        }
    }

    function dragOverHandlerBoard(e: React.DragEvent<HTMLElement>): void {
        e.preventDefault();
        if (e.currentTarget.className === 'board-item') {
            e.currentTarget.style.boxShadow = '0 4px 3px gray';
        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLLIElement>): void {
        e.currentTarget.style.boxShadow = 'none';
    }

    function dragStartHandler(board: IBoards, item: ITask): void {
        setCurrentBoard(board);
        setCurrentTask(item);
    }

    function dragEndHandler(e: React.DragEvent<HTMLLIElement>): void {
        e.currentTarget.style.boxShadow = 'none';
    }

    function dropHandler(e: React.DragEvent<HTMLLIElement>, item: ITask): void {
        onUpdate(data, item);
        e.currentTarget.style.boxShadow = 'none';
    }

    function dropHandlerBoard(e: React.DragEvent<HTMLElement>): void {
        if(data.tasks.length===0) {
            onUpdateBoard(data);
            e.currentTarget.style.boxShadow = 'none';
        }
    }

    return (
        <div className="board"
            onDragOver={(e) => dragOverHandlerBoard(e)}
            onDrop={(e) => dropHandlerBoard(e)}
        >
            <div className="board__header">
                <div className="board__title">{title}</div>
                <div className="board__actions">&hellip;</div>
            </div>
            <ul className="board__items">
                {state.loading && <h1 className="board__loading">Loading...</h1>}
                {data.tasks.length === 0 && !state.loading &&
                    <h3 className="board__tasks-empty">No tasks...</h3>
                }
                {data.tasks.map(el => {
                    return (
                        <li className="board-item" 
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={() => dragStartHandler(data, el)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, el)}
                            draggable 
                            key={el.id}
                        >
                            {el.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
