import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routesList } from './constants/router/routes';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import RouteWrapper from './layouts/RouteWrapper';

const AppRouter = () => (
    <Routes>
        {routesList.map((route, index) => (
            <Route {...route} key={index} />
        ))}

        <Route
            path="*"
            element={
                <RouteWrapper title="Not Found">
                    <NotFoundPage />
                </RouteWrapper>
            }
        />
    </Routes>
);

export default AppRouter;
