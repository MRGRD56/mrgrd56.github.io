const readFileText = (blob: Blob): Promise<string> =>
    new Promise<string>((resolve) => {
        const reader = new FileReader();

        const handleLoad = (event: FileReaderEventMap['load']) => {
            resolve(event.target?.result as string);
            reader.removeEventListener('load', handleLoad);
        };

        reader.addEventListener('load', handleLoad);

        reader.readAsText(blob);
    });

export default readFileText;
