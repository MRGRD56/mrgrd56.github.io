import React from 'react';
import PageContainer, { PageTag } from '../../components/pageContainer/PageContainer';
import SnakeGame from './components/snakeGame/SnakeGame';

const tags = [PageTag.WIP];

const SnakeGamePage = () => {
    return (
        <PageContainer title="Snake Game" tags={tags}>
            <SnakeGame />
        </PageContainer>
    );
};

export default SnakeGamePage;
