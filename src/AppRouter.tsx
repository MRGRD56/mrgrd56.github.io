import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routesList } from './constants/router/routes';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import RouteContextInitializer from './layouts/RouteContextInitializer';

const AppRouter = () => (
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
);

export default AppRouter;
