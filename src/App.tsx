import React, { FunctionComponent } from 'react';
import './App.scss';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { store } from './reducers';
import AppLayout from './layouts/appLayout/AppLayout';
import { HashRouter } from 'react-router-dom';

const App: FunctionComponent = () => (
    <Provider store={store}>
        <HashRouter>
            <AppLayout>
                <AppRouter />
            </AppLayout>
        </HashRouter>
    </Provider>
);

export default App;
