import React, { FunctionComponent, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesList } from './constants/router/routes';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import RouteContextInitializer from './layouts/RouteContextInitializer';
import RouteLoading from './layouts/routeLoading/RouteLoading';

const routeLoading = <RouteLoading />;

const AppRouter: FunctionComponent = () => (
    <Suspense fallback={routeLoading}>
        <Routes>
            {routesList.map((route, index) => (
                <Route {...route} key={index} />
            ))}

            <Route
                path="*"
                element={
                    <RouteContextInitializer title="Not Found" key="@NOT_FOUND">
                        <NotFoundPage />
                    </RouteContextInitializer>
                }
            />
        </Routes>
    </Suspense>
);

export default AppRouter;
