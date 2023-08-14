import React from 'react';
import { BoardList } from './components/BoardList/BoardList';
import { Provider } from 'react-redux';
import store from './store/store';

export function App() {

    return (
        <Provider store={store}>
            <div className="container">
                <BoardList/>
            </div>
        </Provider>
    )
};
