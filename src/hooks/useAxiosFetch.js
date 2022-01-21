import { useState, useEffect } from 'react'
import axios from 'axios'

export const useAxiosFetch = (dataUrl, submittedId, deletedId, updatedId, currentUrl) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
 

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url)
            setData(response.data)
            setFetchError(null)
        } catch (err) {
            setFetchError(err.message)
            setData([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(dataUrl)
    }, [submittedId, deletedId, updatedId, currentUrl === '/blog'])

    return { data, fetchError, isLoading }
}




