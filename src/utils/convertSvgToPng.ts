import { Canvg } from 'canvg';

const canvasToBlob = (canvas: HTMLCanvasElement, type?: string, quality?: any): Promise<Blob | null> =>
    new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });

const convertSvgToPng = async (svgBlob: Blob): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';

    const canvasContext = canvas.getContext('2d');

    if (!canvasContext) {
        throw new Error('no canvas context');
    }

    const svgString = await svgBlob.text();

    const canvg = Canvg.fromString(canvasContext, svgString);
    await canvg.render();

    const result = await canvasToBlob(canvas);
    if (result === null) {
        throw new Error('blob is null');
    }

    // canvas.remove();

    return result;
};

export default convertSvgToPng;
