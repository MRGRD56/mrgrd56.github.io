const copyText = (text: string | undefined) => {
    if (!text) {
        return;
    }

    return navigator.clipboard.writeText(text);
};

export default copyText;
