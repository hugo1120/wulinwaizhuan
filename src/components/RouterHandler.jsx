import { useEffect, useRef } from 'react';

// Extract filename helper
const getFilename = (path) => path.split('/').pop();

const RouterHandler = ({
    data,
    query,
    selectedImage,
    setQuery,
    setSelectedImage
}) => {
    const isInitialMount = useRef(true);

    // 1. Initial Load from URL
    useEffect(() => {
        if (data.length === 0) return;

        const params = new URLSearchParams(window.location.search);
        const urlQuery = params.get('q');
        const urlId = params.get('id');

        // Restore query
        if (urlQuery) {
            setQuery(urlQuery);
        }

        // Restore selected image (modal)
        if (urlId) {
            // urlId is just filename like 01_0060.jpg
            // data.p is full path like 01/01_0060.jpg
            const found = data.find(item => item.p.endsWith(urlId));
            if (found) {
                setSelectedImage(found);
            }
        }
    }, [data, setQuery, setSelectedImage]);

    // 2. Sync State to URL
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const url = new URL(window.location);

        // Sync query
        if (query) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }

        // Sync image modal
        if (selectedImage) {
            url.searchParams.set('id', getFilename(selectedImage.p));
        } else {
            url.searchParams.delete('id');
        }

        window.history.replaceState({}, '', url);

    }, [query, selectedImage]);

    return null;
};

export default RouterHandler;
