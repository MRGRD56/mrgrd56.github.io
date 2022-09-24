import { ImageConvertNoOptions, ImageConvertWithOptions } from '../ImageConverterPageContainer';

function canvasConverter(
    convert: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => string | void
): ImageConvertNoOptions;
function canvasConverter<O>(
    convert: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: O) => string | void
): ImageConvertWithOptions<O>;
function canvasConverter<O>(
    convert: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options?: O) => string | void
): ImageConvertNoOptions | ImageConvertWithOptions<O> {
    return (sourceDataUrl: string, options: O) =>
        new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) {
                throw new Error('Unable to get 2d context');
            }

            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);

                const conversionResult = convert(canvas, context, options);
                const result = conversionResult === undefined ? canvas.toDataURL('image/png') : conversionResult;

                canvas.remove();
                img.remove();
                resolve(result);
            };
            img.onerror = reject;
            img.src = sourceDataUrl;
        });
}

export default canvasConverter;
