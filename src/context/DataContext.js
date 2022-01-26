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

    // const server = ''
    const server = 'https://guarded-bastion-37396.herokuapp.com'
    const dataUrl = `${server}/blog`
    
    const [LogoutButton, setLogoutButton] = useState(null)
    const [token, setToken] = useState(null)
    const [cloudName, setCloudName] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [comment, setComment] = useState('')
    const [newPostText, setNewPostText] = useState('')
    const [newPostTitle, setNewPostTitle] = useState('')
    const [submittedId, setSubmittedId] = useState(null)
    const [deletedId, setDeletedId] = useState(null)
    const [updatedId, setupdatedId] = useState(null)
    const [commentClicked, setCommentClicked] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [click, setClick] = useState(false)
    const [topOnInit, setTopOnInit] = useState(null)
    const [sectionActive, setSectionActive] = useState('intro')
    
    const inputRef = useRef()
    const introRef = useRef(null)
    const aboutRef = useRef(null)
    const skillsRef = useRef(null)
    const codeRef = useRef(null)
    const blogRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { current : currentUrl } = useCurrentUrl(submittedId, deletedId, location)
    const { isLoading, fetchError, posts } = useAxiosFetch(dataUrl, submittedId, deletedId, updatedId, currentUrl)
    const { orientation, touchScreen: touch, deviceClass } = useScreenDetails()[0]

    const sections = [
        { link: "intro", ref: introRef },
        { link: "about", ref: aboutRef },
        { link: "skills", ref: skillsRef },
        { link: "code", ref: codeRef }
    ]

//********** useEffects *************//
        //getting env details for cloudinary and userfront and than connecting to userfront
    useEffect(() => {
      auth()
      setToken(Userfront.accessToken())
    }, [loggedIn])
console.log(Userfront)
console.log(loggedIn)
        //setting top for home on first load so that all references are right for scrolling
    useEffect(() => {
      if (location.pathname.slice(0, 5) !== '/blog') {
        const { top } = introRef.current.getBoundingClientRect()
        setTopOnInit(top)
      }      
    }, [])

        //check if anybody is logged in
    useEffect(() => {
      token === null || token === undefined || Object.entries(token).length === 0 ? setLoggedIn(false) : setLoggedIn(true)  
    }, [token])

      //set section back to intro when clicking blog
    useEffect(() => {
      if (location.pathname === '/blog') setSectionActive('intro')
    }, [location.pathname])

      //on browser refresh, go back to top of home
    useEffect(() => {
      if (performance.getEntriesByType('navigation')[0].type === 'reload') {
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

      //search blog posts
    useEffect(() => {
      if (search !== '') {
        const results = posts.filter(post => {
          return  post.Text.toLowerCase().includes(search.toLowerCase()) || post.Title.toLowerCase().includes(search.toLowerCase()) 
        })
        setFilteredPosts(results)
      } else{
        if (filteredPosts.length !== 0) setFilteredPosts([])
      } 
    }, [search])

//authorization init and env details for cloudinary
    const auth = async() => {
      try {
        const res = await axios.get(`${server}/auth`)
        Userfront.init(res.data.Userfront.tenantId)
        setLogoutButton(Userfront.build({ toolId: res.data.Userfront.toolId }))
        setCloudName(res.data.Cloudinary.cloudName)
      } catch(err) {
        console.log(err)
      } 
    }

//*******************Handlers*********************************
  
        //nav mobile menu open or closed
    const clickHandler = () => setClick(!click) 

        //keeping track of scroll position in sections on home page
    const scrollHandler = () => {
      let offset = 0
      orientation === 'portrait' ? offset = topOnInit + 2 : offset = topOnInit + 4
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
          const response = await axios.post(`${server}/blog/newpost`, newPost, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Userfront.accessToken()}`,
              AccessType: 'admin'
            }
          })
          if (response.status === 200 & response.data !== '') {
            setSubmittedId(response.data._id)
            navigate(`/blog/post/${response.data._id}`)
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
        const postToUpdate = posts.find(post => post._id === postId)
        upOrDown === 'up' ? newNumber = postToUpdate.Likes + 1 : newNumber = postToUpdate.Dislikes + 1 
        upOrDown === 'up' ? updatedPost = {...postToUpdate, Likes : newNumber} : updatedPost = {...postToUpdate, Dislikes : newNumber}
        try {
          const response = await axios.put(`${server}/blog/updatepost/${updatedPost._id}`, updatedPost, {
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
        navigate(`/blog/post/${postId}`)
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
        const postToUpdate = posts.find(post => post._id === postId)
        const { Comments } = postToUpdate
        const now = new Date()
        const nowFormatted = date.format(now, 'DD/MM/YYYY HH:mm')
        const newComment = {Comment: comment, TimeComment: nowFormatted}
        const updatedComments = [...Comments, newComment]
        const updatedPost = {...postToUpdate, Comments: updatedComments}
        console.log(updatedPost)
        try {
          const response = await axios.put(`${server}/blog/updatepost/${postId}`, updatedPost, {
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
          const response = await axios.delete(`${server}/blog/deletepost/${postId}`, {
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
            posts, filteredPosts, isLoading, deleteHandle, fetchError, 
            submitHandle, setNewPostText, newPostText, useInterval,
            newPostTitle, setNewPostTitle, search, blogRef,
            setSearch, thumbsHandle, orientation, touch, deviceClass,
            commentsHandle, comment, setComment, submitCommentHandle,
            inputRef, commentClicked, setCommentClicked, loggedIn, 
            setLoggedIn, LogoutButton, navigate, click, clickHandler,
            location, scrollHandler, sections, sectionActive, cloudName
        }}>
            {children}
        </DataContext.Provider>
    )
}