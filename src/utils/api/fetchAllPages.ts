const fetchAllPages = async <T>(fetchPage: (page: number) => Promise<T[]>): Promise<T[]> => {
    const allPages: T[] = [];

    for (let pageIndex = 1; ; pageIndex++) {
        const pageData = await fetchPage(pageIndex);
        if (pageData?.length > 0) {
            allPages.push(...pageData);
        } else {
            break;
        }
    }

    return allPages;
};

export default fetchAllPages;
