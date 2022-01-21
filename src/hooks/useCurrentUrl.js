import { useEffect, useState } from 'react'

export const useCurrentUrl = (submittedId, deletedId, data) => {
    const [url, setUrl] = useState({
        current: '',
        prev: ''
    })
    
    useEffect(() => {
        if (window.location.pathname !== url.current) {
            setUrl({
                current: window.location.pathname,
                prev : url.current
            })
        }
    }, [submittedId, deletedId, data, window.location.pathname])

    return url  
}