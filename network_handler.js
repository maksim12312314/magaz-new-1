import { useEffect, useState, useCallback } from 'react';

export const DATA_TYPE_ARRAY_BUFFER = 0;
export const DATA_TYPE_BLOB = 1;
export const DATA_TYPE_FORM_DATA = 2;
export const DATA_TYPE_JSON = 3;
export const DATA_TYPE_TEXT = 4;

const DEFAULT_OPTIONS = { method: "GET" };
const EMPTY_FUNC = ()=>{};

const useFetch = (url,
                  options=DEFAULT_OPTIONS,
                  type=DATA_TYPE_JSON,
                  onMount=EMPTY_FUNC,
                  onSuccess=EMPTY_FUNC,
                  onError=EMPTY_FUNC,
                  onAbort=EMPTY_FUNC) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [abortController, setAbortController] = useState(new AbortController());

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            onMount(setLoading, setError, abortController);

            const response = await fetch(url, {...options, signal: abortController.signal});
            let data = null;
            try {
                switch (type) {
                    case DATA_TYPE_ARRAY_BUFFER: {
                        data = await response.arrayBuffer();
                        break;
                    }
                    case DATA_TYPE_BLOB: {
                        data = await response.blob();
                        break;
                    }
                    case DATA_TYPE_FORM_DATA: {
                        data = await response.formData();
                        break;
                    }
                    case DATA_TYPE_JSON: {
                        data = await response.json();
                        break;
                    }
                    case DATA_TYPE_TEXT: {
                        data = await response.text();
                        break;
                    }
                }
            } catch (Error) {
                setError(Error);
                onError(Error);
            }
            setData(data);
            onSuccess(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            
            if ( err.name !== "AbortError" ) {
                setError(err);
                onError(err);
            } else {
                onAbort();
                console.log(`Fetch from url ${url} aborted!`);
            }
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return Object.assign([data, loading, error, fetchData, abortController], { data, loading, error, fetchData, abortController });
};

export default useFetch;