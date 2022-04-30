import React, { FunctionComponent } from 'react';
import './App.scss';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { store } from './reducers';
import AppLayout from './layouts/appLayout/AppLayout';
import { HashRouter } from 'react-router-dom';
import ErudaLayout from './layouts/ErudaLayout';
import ThemeProvider from './layouts/ThemeProvider';
import AppLoadingLayout from './layouts/appLoadingLayout/AppLoadingLayout';

const App: FunctionComponent = () => (
    <ThemeProvider>
        <ErudaLayout>
            <AppLoadingLayout>
                <Provider store={store}>
                    <HashRouter>
                        <AppLayout>
                            <AppRouter />
                        </AppLayout>
                    </HashRouter>
                </Provider>
            </AppLoadingLayout>
        </ErudaLayout>
    </ThemeProvider>
);

export default App;
