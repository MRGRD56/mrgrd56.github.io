import React, { ReactNode, useImperativeHandle, useRef, useState } from 'react';
import styles from './DragAndDropLayout.module.scss';
import { Observable, Subject } from 'rxjs';
import classNames from 'classnames';
import { DownloadOutlined } from '@ant-design/icons';

export interface DragAndDropLayoutRef {
    container: HTMLDivElement;
    fileUpload$: Observable<FileList>;
}

interface Props {
    children?: ReactNode;
    onFilesUpload?: (files: FileList) => void;
}

const DragAndDropLayout = React.forwardRef<DragAndDropLayoutRef, Props>(({ onFilesUpload, children }, ref) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const fileUpload$Ref = useRef<Subject<FileList>>(new Subject<FileList>());
    const dragEntersCountRef = useRef<number>(0);

    useImperativeHandle(
        ref,
        () => {
            if (!containerRef.current) {
                return {} as DragAndDropLayoutRef;
            }

            return {
                container: containerRef.current,
                fileUpload$: fileUpload$Ref.current.asObservable()
            };
        },
        []
    );

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
        dragEntersCountRef.current++;
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        dragEntersCountRef.current = 0;

        const { files } = event.dataTransfer;
        fileUpload$Ref.current.next(files);
        onFilesUpload?.(files);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        dragEntersCountRef.current--;
        if (dragEntersCountRef.current <= 0) {
            setIsDragging(false);
            dragEntersCountRef.current = 0;
        }
    };

    const handleDragExit = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
        dragEntersCountRef.current = 0;
    };

    return (
        <div
            ref={containerRef}
            className={styles.container}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragExit={handleDragExit}
            onDragEnd={handleDragExit}
        >
            {children}
            <div className={classNames(styles.dragOverlay, isDragging && styles.dragging)}>
                <div className={styles.dragOverlayBorder}>
                    <div className={styles.dragOverlayMain}>
                        <DownloadOutlined className={styles.dropIcon} />
                        <div className={styles.infoText}>Drop your files here</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DragAndDropLayout;
