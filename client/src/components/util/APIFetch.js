import { useState, useEffect } from 'react';

const useFetch = (url, body, TYPE) => {
    const [ data, setData ] = useState(null); //response from server
    const [ loading, setLoading ] = useState(false); //are we still loading data from server?

    const getOpts = {
        method: TYPE,
        headers: {
            'content-type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }
    
    const postOpts = {
        ...getOpts,
        body: body
    }

    const fetchApi = async (opts) => {
        setLoading(true);
        const response = await fetch(url, opts);
        const data = await response.json();
        setData(data);
        setLoading(false);
    }

    useEffect(() => {
        if(TYPE === 'POST' || 'PUT') {
            fetchApi(postOpts);
        } else {
            fetchApi(getOpts)
        }
    }, [])

}

export default useFetch;

