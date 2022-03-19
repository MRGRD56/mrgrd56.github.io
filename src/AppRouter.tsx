import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routesList } from './constants/routes';
import NotFoundPage from './pages/NotFoundPage';

const AppRouter = () => (
    <Routes>
        {routesList.map((route, index) => (
            <Route {...route} key={index} />
        ))}

        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default AppRouter;
