import React, { FunctionComponent } from 'react';
import 'luna-object-viewer/luna-object-viewer.css';
import './App.scss';
import './styles/split.scss';
import AppRouter from './AppRouter';
import { Provider } from 'react-redux';
import { store } from './reducers';
import AppLayout from './layouts/appLayout/AppLayout';
import ErudaLayout from './layouts/ErudaLayout';
import ThemeProvider from './layouts/ThemeProvider';
import AppLoadingLayout from './layouts/appLoadingLayout/AppLoadingLayout';
import RouteContextProvider from './layouts/RouteContextProvider';
import RouteContextConsumer from './layouts/RouteContextConsumer';
import OptionalRouter from './components/OptionalRouter';

const App: FunctionComponent = () => (
    <ThemeProvider>
        <ErudaLayout>
            <AppLoadingLayout>
                <Provider store={store}>
                    <RouteContextProvider>
                        <RouteContextConsumer>
                            <OptionalRouter>
                                <AppLayout>
                                    <AppRouter />
                                </AppLayout>
                            </OptionalRouter>
                        </RouteContextConsumer>
                    </RouteContextProvider>
                </Provider>
            </AppLoadingLayout>
        </ErudaLayout>
    </ThemeProvider>
);

export default App;
