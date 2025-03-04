import { useState, useEffect, useCallback } from 'react';

export const useHttpErrorHandler = httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return [error, clearError];
}