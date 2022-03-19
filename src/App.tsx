import React, { FunctionComponent } from 'react';
import './App.scss';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { store } from './reducers';
import AppLayout from './layouts/AppLayout';
import { BrowserRouter } from 'react-router-dom';

const App: FunctionComponent = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppLayout>
                <AppRouter />
            </AppLayout>
        </BrowserRouter>
    </Provider>
);

export default App;
