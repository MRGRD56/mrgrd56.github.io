function downloadUri(uri: string, name?: string): void {
    const link = document.createElement('a');
    link.download = name ?? '';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
}

export default downloadUri;
