import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './ClockPage.module.scss';
import moment, { Moment } from 'moment';
import { useIntervalWhen } from 'rooks';
import Flex from '../../components/flex/Flex';
import Text from 'antd/lib/typography/Text';
import PageCol from '../../components/pageCol/PageCol';
import { Progress } from 'antd';
import pluralize from 'pluralize';

const ClockPage: FunctionComponent = () => {
    const [time, setTime] = useState<Moment>(moment());

    const { hourPercent, minutePercent, secondPercent, millisecondsPercent } = useMemo(() => {
        return {
            hourPercent: ((time.hour() + time.minute() * (1 / 60)) / 24) * 100,
            minutePercent: ((time.minute() + time.second() * (1 / 60)) / 60) * 100,
            secondPercent: ((time.second() + time.millisecond() * (1 / 1000)) / 60) * 100,
            millisecondsPercent: (time.millisecond() / 1000) * 100
        };
    }, [time]);

    const updateTime = useCallback(() => {
        setTime(moment());
    }, []);

    useIntervalWhen(updateTime, 49);

    return (
        <PageContainer>
            <PageCol>
                <Flex col className={styles.timeContainer}>
                    <Flex row>
                        <Text className={styles.timeMain}>{time.format('HH:mm:ss')}</Text>
                        <Text className={styles.timeMs}>{time.format("'SSS")}</Text>
                    </Flex>
                    <Text className={styles.timeDate}>{time.format('ddd, LL')}</Text>
                </Flex>
                <Text className="mt-2">{pluralize('hour', time.hour(), true)}</Text>
                <Progress percent={hourPercent} showInfo={false} />
                <Text className="mt-2">{pluralize('minute', time.minute(), true)}</Text>
                <Progress percent={minutePercent} showInfo={false} />
                <Text className="mt-2">{pluralize('second', time.second(), true)}</Text>
                <Progress percent={secondPercent} showInfo={false} />
                <Text className="mt-2">{pluralize('millisecond', time.millisecond(), true)}</Text>
                <Progress percent={millisecondsPercent} showInfo={false} />
            </PageCol>
        </PageContainer>
    );
};

export default ClockPage;
