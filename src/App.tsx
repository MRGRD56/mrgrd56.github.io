import React, { FunctionComponent } from 'react';
import 'luna-object-viewer/luna-object-viewer.css';
import './App.scss';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { store } from './reducers';
import AppLayout from './layouts/appLayout/AppLayout';
import { HashRouter } from 'react-router-dom';
import ErudaLayout from './layouts/ErudaLayout';
import ThemeProvider from './layouts/ThemeProvider';
import AppLoadingLayout from './layouts/appLoadingLayout/AppLoadingLayout';
import RouteContextProvider from './layouts/RouteContextProvider';
import RouteContextConsumer from './layouts/RouteContextConsumer';

const App: FunctionComponent = () => (
    <ThemeProvider>
        <ErudaLayout>
            <AppLoadingLayout>
                <Provider store={store}>
                    <RouteContextProvider>
                        <RouteContextConsumer>
                            <HashRouter>
                                <AppLayout>
                                    <AppRouter />
                                </AppLayout>
                            </HashRouter>
                        </RouteContextConsumer>
                    </RouteContextProvider>
                </Provider>
            </AppLoadingLayout>
        </ErudaLayout>
    </ThemeProvider>
);

export default App;
