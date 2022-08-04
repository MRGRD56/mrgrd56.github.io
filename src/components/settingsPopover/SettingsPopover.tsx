import React, { FunctionComponent } from 'react';
import { Button, Col } from 'antd';
import styles from './SettingsPopover.module.scss';
import { CloseOutlined } from '@ant-design/icons';

interface Props {
    title?: string;
    onClose: () => void;
}

const SettingsPopover: FunctionComponent<Props> = ({ title = 'Settings', onClose, children }) => {
    return (
        <Col className={styles.formContainer}>
            <div className={styles.title}>
                <h3 className="mb-0">{title}</h3>
                <div className={styles.rightSide}>
                    {onClose && <Button size="small" type="text" icon={<CloseOutlined />} onClick={onClose} />}
                </div>
            </div>
            {children}
        </Col>
    );
};

export default SettingsPopover;
