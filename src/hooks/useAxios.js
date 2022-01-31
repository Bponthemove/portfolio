import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAxios = (details, setDeletedId, setNewPostText, setNewPostTitle) => {
    const [data, setdata] = useState(null)
    const [axiosError, setAxiosError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [submittedId, setSubmittedId] = useState(null)
    const [updatedId, setUpdatedId] = useState(null)
    const [comment, setComment] = useState('')
    const navigate = useNavigate()
    const previousMethod = useRef(null)

//save latest axios method to remember and than request server data
    useEffect(() => {
        if (details.method !== 'get') previousMethod.current = details.method   
        if (details.method) request(details)
    }, [details])

    const request = async({ method, url, postDetails, headers })  => {
//set up axios request object
        await axios({
            method: method,
            url: url,
            data: postDetails,
            headers: headers,
        })
        .then(res => {
//if response is ok than see which method and act accordingly. And after updating state, request new post list
            if (res.status === 200) {
                if (method === 'get') {
                    setdata(res.data)
                    if (previousMethod.current === 'post') {
                        navigate(`/blog/post/${submittedId}`)
                        setNewPostText('')
                        setNewPostTitle('')
                        previousMethod.current = null
                        setSubmittedId(null)
                        return    
                    }
                    if (previousMethod.current === 'delete') {
                        navigate('/blog')
                        previousMethod.current = null
                        return
                    }
                    return
                }
                if (method === 'post') {
                    setSubmittedId(res.data._id)
                    return
                }
                if (method === 'delete') {
                    setDeletedId(res.data._id)
                    return
                }
                if (method === 'put') {
                    setUpdatedId(res.data._id)
                    setComment('')
                    return
                }
            }
        }) 
        .catch(err => {
            console.log(err)
            setAxiosError(err) 
        }) 
        .finally(() => {
            setIsLoading(false)
        })
    }
    return { data, axiosError, isLoading, submittedId, updatedId, comment, setComment }
}