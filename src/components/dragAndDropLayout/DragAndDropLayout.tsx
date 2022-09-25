import React, { ReactNode, useImperativeHandle, useRef, useState } from 'react';
import styles from './DragAndDropLayout.module.scss';
import { Observable, Subject } from 'rxjs';
import classNames from 'classnames';
import { DownloadOutlined } from '@ant-design/icons';
import { useWindowEventListener } from 'rooks';

export interface DragAndDropLayoutRef {
    container: HTMLDivElement;
    fileUpload$: Observable<FileList>;
}

interface Props {
    children?: ReactNode;
    onFilesUpload?: (files: FileList) => void;
    checkFile?: (file: Blob | DataTransferItem) => boolean;
}

const DragAndDropLayout = React.forwardRef<DragAndDropLayoutRef, Props>(
    ({ onFilesUpload, checkFile, children }, ref) => {
        const [isDragging, setIsDragging] = useState<boolean>(false);
        const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

        const containerRef = useRef<HTMLDivElement>(null);
        const fileUpload$Ref = useRef<Subject<FileList>>(new Subject<FileList>());
        const dragEntersCountRef = useRef<number>(0);
        const dragOverEntersCountRef = useRef<number>(0);

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

            const dataTransferItems = event.dataTransfer.items;
            if (checkFile && Array.from(dataTransferItems).every((item) => !checkFile(item))) {
                return;
            }

            setIsDraggingOver(true);
            dragEntersCountRef.current++;
        };

        const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        };

        const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
            setIsDragging(false);
            setIsDraggingOver(false);
            dragEntersCountRef.current = 0;
            dragOverEntersCountRef.current = 0;

            const { files } = event.dataTransfer;

            const matchingFiles = checkFile ? Array.from(files).filter(checkFile) : files;

            if (!matchingFiles.length) {
                return;
            }

            event.preventDefault();

            fileUpload$Ref.current.next(files);
            onFilesUpload?.(files);
        };

        const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
            dragEntersCountRef.current--;
            if (dragEntersCountRef.current <= 0) {
                setIsDraggingOver(false);
                dragEntersCountRef.current = 0;
            }
        };

        useWindowEventListener('dragenter', (event: DragEvent) => {
            const dataTransferItems = event.dataTransfer?.items ?? [];
            if (checkFile && Array.from(dataTransferItems).every((item) => !checkFile(item))) {
                return;
            }

            event.preventDefault();
            setIsDragging(true);
            dragOverEntersCountRef.current++;
        });

        useWindowEventListener('dragleave', (event) => {
            dragOverEntersCountRef.current--;
            if (dragOverEntersCountRef.current <= 0) {
                setIsDragging(false);
                dragOverEntersCountRef.current = 0;
            }
        });

        useWindowEventListener('dragover', (event) => {
            event.preventDefault();
        });

        useWindowEventListener('drop', (event) => {
            setIsDragging(false);
            setIsDraggingOver(false);
            dragEntersCountRef.current = 0;
            dragOverEntersCountRef.current = 0;
        });

        const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
            const { files } = event.clipboardData;

            const matchingFiles = checkFile ? Array.from(files).filter(checkFile) : files;
            if (!matchingFiles.length) {
                return;
            }

            fileUpload$Ref.current.next(files);
            onFilesUpload?.(files);
        };

        return (
            <div
                ref={containerRef}
                className={classNames('focus-visible-unstyled', styles.container)}
                tabIndex={0}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                // onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                // onDragExit={handleDragExit}
                // onDragEnd={handleDragExit}
                onPaste={handlePaste}
            >
                {children}
                <div
                    className={classNames(
                        styles.dragOverlay,
                        (isDragging || isDraggingOver) && styles.dragging,
                        isDraggingOver && styles.draggingOver
                    )}
                >
                    <div className={styles.dragOverlayBorder}>
                        <div className={styles.dragOverlayMain}>
                            <DownloadOutlined className={styles.dropIcon} />
                            <div className={styles.infoText}>Drop your files here</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default DragAndDropLayout;
