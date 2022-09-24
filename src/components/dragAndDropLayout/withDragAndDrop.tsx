import { FC, RefObject } from 'react';
import { DragAndDropLayoutRef } from './DragAndDropLayout';

export interface DndLayoutedProps {
    dndLayoutRef: RefObject<DragAndDropLayoutRef>;
}

const withDragAndDrop = <P extends DndLayoutedProps>(
    component: FC<P>,
    dndLayoutRef: RefObject<DragAndDropLayoutRef>
): FC<Omit<P, 'dndLayoutRef'>> => {
    const Component = component;
    // @ts-ignore
    return (props) => <Component dndLayoutRef={dndLayoutRef} {...props} />;
};

export default withDragAndDrop;
