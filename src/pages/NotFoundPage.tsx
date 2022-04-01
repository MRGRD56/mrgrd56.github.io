import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { routes } from '../constants/routes';

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle={
                <div>
                    <p>The page you are trying to access was not found</p>
                    <Link to={routes.root.path}>Go to home page</Link>
                </div>
            }
        />
    );
};

export default NotFoundPage;
