import React, { FunctionComponent } from 'react';
import { BasicProps, Footer } from 'antd/lib/layout/layout';
import styles from './AppFooter.module.scss';
import moment from 'moment';
import ExternalLink from '../../../../components/ExternalLink';
import { GithubFilled } from '@ant-design/icons';
import { ReactComponent as TelegramLogoDark } from '../../../../assets/img/telegram-logo-dark-2.svg';
import classNames from 'classnames';

const currentYear = moment().year();

type Props = BasicProps;

const AppFooter: FunctionComponent<Props> = ({ className, ...props }) => {
    return (
        <Footer className={classNames(styles.container, className)} {...props}>
            <div className={styles.copyright}>Kirill Golikov © {currentYear}</div>
            <div className={styles.socials}>
                <ExternalLink href="https://github.com/MRGRD56">
                    <GithubFilled className={styles.link} />
                </ExternalLink>
                <ExternalLink href="https://t.me/MRGRD56">
                    <TelegramLogoDark className={styles.link} />
                </ExternalLink>
            </div>
        </Footer>
    );
};

export default AppFooter;
