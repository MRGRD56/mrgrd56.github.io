import React, { useCallback, useRef, useState } from 'react';
import styles from './BgGeneratorPage.module.scss';
import PageContainer from '../../components/pageContainer/PageContainer';
import ExternalLink from '../../components/ExternalLink';
import { Button, Col, Image, InputNumber, Row, Space } from 'antd';
import { Size } from '../../types';
import getScaledScreenSize from '../../utils/getScaledScreenSize';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import stringifySize from '../../utils/stringifySize';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import getWindowSize from '../../utils/getWindowSize';
import getScreenSize from '../../utils/getScreenSize';
import './BgGeneratorPage.scss';

const generateImage = ({ width, height }: Size, color: string, imgCanvas: HTMLCanvasElement): string | undefined => {
    if (width < 0 || height < 0) {
        return;
    }

    const imgCanvasContext = imgCanvas.getContext('2d');

    if (!imgCanvasContext) {
        return;
    }

    imgCanvas.width = width;
    imgCanvas.height = height;
    imgCanvasContext.fillStyle = color;
    imgCanvasContext.fillRect(0, 0, width, height);
    return imgCanvas.toDataURL('image/png');
};

const BgGeneratorPage = () => {
    const imgCanvasRef = useRef<HTMLCanvasElement>(null);

    const [size, setSize] = useState<Size>(getScaledScreenSize());
    const [color, setColor] = useState<string>('#42a5f5');
    const imgSource = useDebouncedMemo(
        { size, color, imgCanvasRef },
        ({ size, color, imgCanvasRef }) => {
            if (!imgCanvasRef.current) {
                return;
            }

            return generateImage(size, color, imgCanvasRef.current);
        },
        [size, color],
        50
    );

    const handleColorChange = useCallback<ColorChangeHandler>(({ hex }) => {
        setColor(hex);
    }, []);

    const handleSizeChange = useCallback(
        (sizeKey: keyof Size) => (value: number) => {
            setSize((currentSize) => ({
                ...currentSize,
                [sizeKey]: value
            }));
        },
        []
    );

    const handleUseSize = (sizeFunction: () => Size) => () => {
        setSize(sizeFunction());
    };

    return (
        <PageContainer
            title="Background Generator"
            description="Generates a simple background of the specified size and color"
            titleExtra={
                <ExternalLink href="https://mrgrd56.github.io/bg-generator">Check out old version</ExternalLink>
            }
        >
            <canvas className="d-none" ref={imgCanvasRef} />
            <Col>
                <Row gutter={16}>
                    <Col className="mb-3">
                        <SketchPicker
                            color={color}
                            onChange={handleColorChange}
                            className="BgGeneratorPage_color-picker"
                        />
                    </Col>
                    <Col className="mb-3">
                        <Space direction="vertical">
                            <Row gutter={10} align="middle">
                                <Col span={8}>
                                    <label htmlFor="width-input">Width</label>
                                </Col>
                                <Col>
                                    <InputNumber
                                        id="width-input"
                                        value={size.width}
                                        onChange={handleSizeChange('width')}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={10} align="middle">
                                <Col span={8}>
                                    <label htmlFor="height-input">Height</label>
                                </Col>
                                <Col>
                                    <InputNumber
                                        id="height-input"
                                        value={size.height}
                                        onChange={handleSizeChange('height')}
                                    />
                                </Col>
                            </Row>
                            <Row className={styles.sizeButtonsContainer}>
                                <Button onClick={handleUseSize(getScaledScreenSize)}>
                                    Use scaled screen size {stringifySize(getScaledScreenSize())}
                                </Button>
                                <Button onClick={handleUseSize(getScreenSize)}>
                                    Use screen size {stringifySize(getScreenSize())}
                                </Button>
                                <Button onClick={handleUseSize(getWindowSize)}>
                                    Use window size {stringifySize(getWindowSize())}
                                </Button>
                            </Row>
                        </Space>
                    </Col>
                </Row>
                <Col>
                    <Image src={imgSource} className={styles.resultImage} />
                </Col>
            </Col>
        </PageContainer>
    );
};

export default BgGeneratorPage;
