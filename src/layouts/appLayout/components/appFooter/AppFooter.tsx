import React from 'react';
import { Footer } from 'antd/lib/layout/layout';
import styles from './AppFooter.module.scss';
import moment from 'moment';
import ExternalLink from '../../../../components/ExternalLink';
import { GithubFilled } from '@ant-design/icons';
import { ReactComponent as TelegramLogoDark } from '../../../../assets/img/telegram-logo-dark-2.svg';

const currentYear = moment().year();

const AppFooter = () => {
    return (
        <Footer className={styles.container}>
            <div className={styles.copyright}>Kirill Golikov © {currentYear}</div>
            <ExternalLink href="https://github.com/MRGRD56">
                <GithubFilled className={styles.link} />
            </ExternalLink>
            <ExternalLink href="https://t.me/MRGRD56">
                <TelegramLogoDark className={styles.link} />
            </ExternalLink>
        </Footer>
    );
};

export default AppFooter;
