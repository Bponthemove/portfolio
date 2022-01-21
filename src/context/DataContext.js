import React, { useState, useEffect, createContext, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAxiosFetch } from "../hooks/useAxiosFetch" 
import { useCurrentUrl } from '../hooks/useCurrentUrl'
import { useScreenDetails } from '../hooks/useScreenDetails'
import { useInterval } from '../hooks/useInterval'
import Userfront from "@userfront/react";
import date from 'date-and-time'
import axios from 'axios'

export const DataContext = createContext({})

export const DataProvider = ({children}) => {
    Userfront.init("vbqdqvnq");
    const baseUrl = 'https://git.heroku.com/guarded-bastion-37396.git'

    const [search, setSearch] = useState('')
    const [comment, setComment] = useState('')
    const [posts, setPosts] = useState([])
    const [newPostText, setNewPostText] = useState('')
    const [newPostTitle, setNewPostTitle] = useState('')
    const [submittedId, setSubmittedId] = useState(null)
    const [deletedId, setDeletedId] = useState(null)
    const [dataUrl, setDataUrl] = useState(`${baseUrl}/home`)
    const [updatedId, setupdatedId] = useState(null)
    const [commentClicked, setCommentClicked] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [click, setClick] = useState(false)
    const [offset, setOffset] = useState(null)
    const [sectionActive, setSectionActive] = useState('intro')
    
    const inputRef = useRef()
    const introRef = useRef(null)
    const aboutRef = useRef(null)
    const skillsRef = useRef(null)
    const codeRef = useRef(null)
    const blogRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { current : currentUrl, prev : prevUrl } = useCurrentUrl(submittedId, deletedId, location)
    const { isLoading, fetchError, data } = useAxiosFetch(dataUrl, submittedId, deletedId, updatedId, currentUrl)
    const { orientation, touchScreen: touch, deviceClass } = useScreenDetails()[0]
    const { width, height } = useScreenDetails()[1]

    const sections = [
        { link: "intro", ref: introRef },
        { link: "about", ref: aboutRef },
        { link: "skills", ref: skillsRef },
        { link: "code", ref: codeRef }
    ]    

//********** useEffects *************//

        //setting offset on home route so that all references are right
    useEffect(() => {
      if (!isLoading && currentUrl === '/') {
        const { top } = introRef.current.getBoundingClientRect()
        setOffset(top + 2)
      }
    }, [isLoading, orientation, width, height, currentUrl])

        //check if anybody is logged in
    useEffect(() => {
      Userfront.accessToken() ? setLoggedIn(true) : setLoggedIn(false)  
    }, [Userfront.accessToken()])
        
        //if there is new data then update state
    useEffect(() => {
        if (data.length !== 0) setPosts(data)
    }, [data, currentUrl === '/blog'])

      //set section back to intro when clicking blog
    useEffect(() => {
      if (location.pathname === '/blog') setSectionActive('intro')
    }, [location.pathname])

      //on browser refresh, go back to top of home
    useEffect(() => {
      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        if (location.pathname === '/') {
          navigate('/#intro')
          setSectionActive('intro')
          location.hash = '#intro'
          introRef.current.scrollIntoView()         
        } else {
          navigate('/blog')
          setSectionActive('intro')
          location.hash = ''
        }
      }
    }, [])

//logout button
    const LogoutButton = Userfront.build({
      toolId: "ddbloa"
    })

//*******************Handlers*********************************
  
        //nav mobile menu open or closed
    const clickHandler = () => setClick(!click) 

        //keeping track of scroll position in sections on home page
    const scrollHandler = () => {
      const { height, top } = introRef.current.getBoundingClientRect()
      if ((offset - height) < top) return setSectionActive('intro')
      if ((offset - (height * 2)) < top) return setSectionActive('about')
      if ((offset - (height * 3)) < top) return setSectionActive('skills')
      if ((offset - (height * 4)) < top) return setSectionActive('code')    
    }

  //CREATE -----****submit new post handler****------ 
    const submitHandle = async (e) => {
      e.preventDefault()
      if (!loggedIn) {
        navigate('/login')
        alert('Only the administrator can submit a blog')
        return
      }
      if (newPostTitle === '') {
        alert('please provide a title for your blog')
        return
      }
      if (newPostText === '') {
        alert('please provide the main text for your blog')
        return
      } else {
        const now = new Date()
        const nowFormatted = date.format(now, 'DD/MM/YYYY HH:mm')
        const newPost = {Title: newPostTitle, Text: newPostText, Time: nowFormatted}
        try {
          const response = await axios.post(`${baseUrl}/newpost`, newPost, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Userfront.accessToken()}`,
              AccessType: 'admin'
            }
          })
          if (response.status === 200 & response.data !== '') {
            setSubmittedId(response.data._id)
            navigate(`/post/${response.data._id}`)
          } else {
            alert('only the administrator can delete a blog')
            return
          }
        } catch(err) {
          console.log(`Error: ${err.message}`)
        } finally {
          setNewPostText('')
          setNewPostTitle('')
        }
      }
    }

  //READ -----****link on post itself****-------

  //UPDATE -----****thumbs and add comment handlers****------ 
    const thumbsHandle = async (postId, upOrDown) => {
      if (loggedIn) {
        let newNumber
        let updatedPost
        const postToUpdate = data.find(post => post._id === postId)
        upOrDown === 'up' ? newNumber = postToUpdate.Likes + 1 : newNumber = postToUpdate.Dislikes + 1 
        upOrDown === 'up' ? updatedPost = {...postToUpdate, Likes : newNumber} : updatedPost = {...postToUpdate, Dislikes : newNumber}
        console.log(updatedPost)
        try {
          const response = await axios.put(`${baseUrl}/updatepost/${updatedPost._id}`, updatedPost, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Userfront.accessToken()}`,
              AccessType: 'member',
              AccessFor: 'thumbs'
            }
          })
          console.log(response)
          if (response.status === 200 & response.data !== '') {
            setupdatedId(response.data)
          } else {
            alert('Only one like/dislike per post please')
            return
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        navigate('/login')
        alert('please log in to like or dislike')
      }
    }
      //handler to take you from '/blog' to post itself and places focus on input to add comment
    const commentsHandle = postId => {
      if (loggedIn) {
        setCommentClicked(true)
        navigate(`/post/${postId}`)
      } else {
        navigate('/login')
        alert('please log in to comment')
      }
    }

    const submitCommentHandle = async (event, postId) => {
      event.preventDefault()
      if (!loggedIn) {
        navigate('/login')
        alert('please log in to comment')
        return
      }
      if (comment==='') {
        alert('please provide a comment')
        return
      } else {
        //check token auth first
        const postToUpdate = data.find(post => post._id === postId)
        const { Comments } = postToUpdate
        const now = new Date()
        const nowFormatted = date.format(now, 'DD/MM/YYYY HH:mm')
        const newComment = {Comment: comment, TimeComment: nowFormatted}
        const updatedComments = [...Comments, newComment]
        const updatedPost = {...postToUpdate, Comments: updatedComments}
        console.log(updatedPost)
        try {
          const response = await axios.put(`${baseUrl}/updatepost/${postId}`, updatedPost, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Userfront.accessToken()}`,
              AccessType: 'admin',
              AccessFor: 'comments'
            }
          })
          setupdatedId(response.data)
        } catch (err) {
          console.log(err)
        } finally {
          setComment('')
        }
      }
    }
  
  //DELETE -----****delete handler****------ 
    const deleteHandle = async (postId) => {
      if (loggedIn) {
        try {
          const response = await axios.delete(`${baseUrl}/deletepost/${postId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Userfront.accessToken()}`,
              AccessType: 'admin'
            }
          })
          if (response.status === 200 & response.data !== '') {
            setDeletedId(response.data._id)
            navigate('/blog')
            return
          } else {
            alert('only the administrator can delete a blog')
            return
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        navigate('/login')
        alert('please log in as an administrator to delete')
      }
    }

    return (
        <DataContext.Provider value={{
            posts, isLoading, deleteHandle, fetchError, 
            submitHandle, setNewPostText, newPostText, 
            newPostTitle, setNewPostTitle, search, 
            setSearch, thumbsHandle, orientation, touch, deviceClass,
            commentsHandle, comment, setComment, submitCommentHandle,
            inputRef, commentClicked, setCommentClicked, loggedIn, 
            setLoggedIn, LogoutButton, navigate, click, clickHandler,
            location, scrollHandler, sections, sectionActive,
            blogRef, useInterval
        }}>
            {children}
        </DataContext.Provider>
    )
}