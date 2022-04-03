const dummyAntdUploadRequest = ({ onSuccess }: { onSuccess?: (response: string) => void }) => {
    setTimeout(() => {
        onSuccess?.('ok');
    }, 0);
};

export default dummyAntdUploadRequest;
