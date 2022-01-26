import { useState, useEffect } from 'react'
import axios from 'axios'

export const useAxiosFetch = (dataUrl, submittedId, deletedId, updatedId, currentUrl) => {
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
 
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url)
            setPosts(response.data)
            setFetchError(null)
        } catch (err) {
            setFetchError(err.message)
            setPosts([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (currentUrl === '/blog') fetchData(dataUrl)
    }, [submittedId, deletedId, updatedId, currentUrl])

    return { posts, fetchError, isLoading }
}




