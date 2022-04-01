import React from 'react';
import { Result } from 'antd';

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle={
                <div>
                    <p>The page you are trying to access was not found</p>
                    <a href="/">Go to home page</a>
                </div>
            }
        />
    );
};

export default NotFoundPage;
