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
    
    const [problem, setProblem] = useState(null)
    const [toolId, setToolId] = useState(null)
    const [token, setToken] = useState(null)
    const [cloudName, setCloudName] = useState('dnytpilwo')
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
    const navRef = useRef(null)
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
      if (!cloudName && !toolId) {
        auth()
        setToken(Userfront.accessToken())
      }
    }, [])

        //setting offset for home on first load so that all references are right for scrolling
    useEffect(() => {
      if (!blogRef.current) {
        const { bottom } = navRef.current.getBoundingClientRect()
        setTopOnInit(bottom)
        console.log(bottom)   
      } else {
        setTopOnInit(null)
      }
    }, [blogRef, orientation])

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
      if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
        navigate('/#intro')
        setSectionActive('intro')
        location.hash = '#intro'      
      }
    }, [])

      //search blog posts
    useEffect(() => {
      if (search !== '') {
        const results = posts.filter(post => {
          return  post.Text.toLowerCase().includes(search.toLowerCase()) || post.Title.toLowerCase().includes(search.toLowerCase()) 
        })
        console.log(results)
        if (results.length !== 0) {
          setFilteredPosts(results)
        } else {
          setFilteredPosts('error')
        }
      } else{
        if (filteredPosts.length !== 0) setFilteredPosts([])
      } 
    }, [search])

//authorization init and env details for cloudinary
    const auth = async() => {
      try {
        const res = await axios.get(`${server}/auth`)
        if (res.statusText === 'OK') {
          console.log(res)
          Userfront.init(res.data[0].Userfront_tenantId)
          setToolId(res.data[0].Userfront_toolId)
          setCloudName(res.data[1].Cloudinary_cloudName)
        }
      } catch(err) {
        console.error(err)
        setProblem("can't retrieve environment variables")
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
          console.log(response)
          if (response.status === 200) {
            setSubmittedId(response.data._id)
            navigate(`/blog/post/${response.data._id}`)
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
          console.log(response)
          if (response.status === 200) {
            setDeletedId(response.data._id)
            navigate('/blog')
            return
          }
        } catch (err) {
          navigate('/NotFound', )
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
            newPostTitle, setNewPostTitle, search, blogRef, problem,
            setSearch, thumbsHandle, orientation, touch, deviceClass,
            commentsHandle, comment, setComment, submitCommentHandle,
            inputRef, commentClicked, setCommentClicked, loggedIn, 
            setLoggedIn, toolId, navigate, click, clickHandler, navRef,
            location, scrollHandler, sections, sectionActive, cloudName
        }}>
            {children}
        </DataContext.Provider>
    )
}