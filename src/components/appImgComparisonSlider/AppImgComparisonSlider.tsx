import React, { AllHTMLAttributes, ChangeEventHandler, FunctionComponent } from 'react';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import classNames from 'classnames';
import styles from './AppImgComparisonSlider.module.scss';

type HTMLImgComparisonSliderElement = HTMLElement & {
    value: number;
    hover: boolean;
    direction: string;
};
type ImgComparisonSliderProps = AllHTMLAttributes<HTMLImgComparisonSliderElement> & {
    value?: number | string;
    hover?: boolean;
    direction?: string;
    keyboard?: 'enabled' | 'disabled';
    onSlide?: ChangeEventHandler<HTMLImgComparisonSliderElement>;
};
interface Props extends ImgComparisonSliderProps {
    src1: string | undefined;
    src2: string | undefined;
    fit?: boolean;
}

const AppImgComparisonSlider: FunctionComponent<Props> = ({ src1, src2, fit, className, ...props }) => {
    return (
        <ImgComparisonSlider className={classNames(styles.container, fit && styles.fit, className)} {...props}>
            <img className={styles.image} slot="first" src={src1} />
            <img className={styles.image} slot="second" src={src2} />
        </ImgComparisonSlider>
    );
};

export default AppImgComparisonSlider;
