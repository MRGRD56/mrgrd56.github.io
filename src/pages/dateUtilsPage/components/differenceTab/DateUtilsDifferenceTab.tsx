import React, { FunctionComponent, useMemo, useState } from 'react';
import { Checkbox, Col, DatePicker, Space } from 'antd';
import moment, { duration, Duration, Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import Text from 'antd/lib/typography/Text';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const DateUtilsDifferenceTab: FunctionComponent = () => {
    const [range, setRange] = useState<RangeValue<Moment>>([moment(), moment()]);

    const [isTotalDifference, setIsTotalDifference] = useState<boolean>(false);
    const [isTimeShown, setIsTimeShown] = useState<boolean>(false);

    const handleIsTotalDifferenceChange = (event: CheckboxChangeEvent) => {
        const { checked } = event.target;
        setIsTotalDifference(checked);
    };

    const handleIsTimeShownChange = (event: CheckboxChangeEvent) => {
        const { checked } = event.target;
        setIsTimeShown(checked);
    };

    const difference = useMemo<Duration | undefined>(() => {
        if (!range) {
            return undefined;
        }

        const [date1, date2] = range;

        if (!date1 || !date2) {
            return undefined;
        }

        return duration(date2.diff(date1));
    }, [range]);

    const differenceMethod = isTotalDifference ? 'as' : 'get';

    return (
        <Col xs={24} md={18} lg={14} xl={10} xxl={8}>
            <DatePicker.RangePicker showTime={isTimeShown} value={range as any} onChange={setRange} />
            {difference && (
                <Col className="mt-2">
                    <Space direction="vertical">
                        <Checkbox checked={isTimeShown} onChange={handleIsTimeShownChange}>
                            Show time
                        </Checkbox>
                        <Checkbox checked={isTotalDifference} onChange={handleIsTotalDifferenceChange}>
                            Total
                        </Checkbox>
                        <Text>Years: {difference[differenceMethod]('years')}</Text>
                        <Text>Months: {difference[differenceMethod]('months')}</Text>
                        <Text>Days: {difference[differenceMethod]('days')}</Text>
                        <Text>Hours: {difference[differenceMethod]('hours')}</Text>
                        <Text>Minutes: {difference[differenceMethod]('minutes')}</Text>
                        <Text>Seconds: {difference[differenceMethod]('seconds')}</Text>
                    </Space>
                </Col>
            )}
        </Col>
    );
};

export default DateUtilsDifferenceTab;
