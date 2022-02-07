import React, { useState, useEffect, createContext, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCurrentUrl } from '../hooks/useCurrentUrl'
import { useScreenDetails } from '../hooks/useScreenDetails'
import { useInterval } from '../hooks/useInterval'
import { useAxios } from '../hooks/useAxios'
import { useUserfront } from '../hooks/useUserfront'
import date from 'date-and-time'
import axios from 'axios'

export const DataContext = createContext({})

export const DataProvider = ({children}) => {

    // const server = ''
    const server = 'https://guarded-bastion-37396.herokuapp.com'
    const dataUrl = `${server}/blog`
    
    const [posts, setPosts] = useState([])
    const [details, setDetails] = useState({
      method: null,
      url: null,
      postDetails: null,
      headers: null,
    })
    const [envError, setEnvError] = useState(null)
    const [userfrontTenantId, setUserfrontTenantId] = useState(null)
    const [cloudName, setCloudName] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [newPostText, setNewPostText] = useState('')
    const [newPostTitle, setNewPostTitle] = useState('')
    const [deletedId, setDeletedId] = useState(null)
    const [commentClicked, setCommentClicked] = useState(false)
    const [click, setClick] = useState(false)
    const [topOnInit, setTopOnInit] = useState(null)
    const [sectionActive, setSectionActive] = useState('intro')
    
    const inputRef = useRef()
    const homeRef = useRef(null)
    const introRef = useRef(null)
    const aboutRef = useRef(null)
    const skillsRef = useRef(null)
    const codeRef = useRef(null)
    const blogRef = useRef(null)
    const navRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { LogoutButton, SignupForm, LoginForm, token } = useUserfront(userfrontTenantId, location)
    const { data, axiosError, isLoading, submittedId, updatedId, comment, setComment } = useAxios(details, setDeletedId, setNewPostText, setNewPostTitle)
    const { current : currentUrl } = useCurrentUrl(submittedId, deletedId, location)
    const { orientation, touchScreen: touch, deviceClass } = useScreenDetails()[0]

    const sections = [
        { link: "home", ref: homeRef},
        { link: "intro", ref: introRef },
        { link: "about", ref: aboutRef },
        { link: "skills", ref: skillsRef },
        { link: "code", ref: codeRef }
    ]

//********** useEffects *************//
        //error
    useEffect(() => {
      if (axiosError) alert(`${axiosError.response.data}`)
      if (envError) alert(`${envError}`)
    }, [axiosError, envError])

        //updating posts after each back end manipulation
    useEffect(() => {
      if (currentUrl === '/blog') 
        setDetails({
          method: 'get',
          url: dataUrl,
          postDetails: null,
          headers: null,
        })
    }, [ submittedId, deletedId, updatedId, currentUrl ])

    useEffect(() => {
      if (data) setPosts(data)
    }, [data])

        //getting env details for cloudinary and userfront and than connecting to userfront
    useEffect(() => {
      auth()
    }, [])

        //setting offset for home on first load so that all references are right for scrolling
    useEffect(() => {
      if (!blogRef.current) {
        const { bottom } = navRef.current.getBoundingClientRect()
        setTopOnInit(bottom)  
      } else {
        setTopOnInit(null)
      }
    }, [blogRef, orientation])

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
        if (res.status === 200) {
          setUserfrontTenantId(res.data.Userfront_tenantId)
          setCloudName(res.data.Cloudinary_cloudName)
        }
      } catch(err) {
        setEnvError(err)
      } 
    }

//*******************Handlers*********************************
  
        //nav mobile menu open or closed
    const clickHandler = () => setClick(!click) 

        //keeping track of scroll position in sections on home page
    const scrollHandler = () => {
      if (click) setClick(!click)
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
      if (!token) {
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
        setDetails({
          method: 'post',
          url: `${server}/blog/newpost`,
          postDetails: newPost,
          headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "AccessType": "admin"
                }
        })
      }
    }

  //READ -----****link on post itself****-------

  //UPDATE -----****thumbs and add comment handlers****------ 
    const thumbsHandle = async (postId, upOrDown) => {
      if (token) {
        let newNumber
        let updatedPost
        const postToUpdate = posts.find(post => post._id === postId)
        upOrDown === 'up' ? newNumber = postToUpdate.Likes + 1 
                            : newNumber = postToUpdate.Dislikes + 1 
        upOrDown === 'up' ? updatedPost = {...postToUpdate, Likes : newNumber} 
                            : updatedPost = {...postToUpdate, Dislikes : newNumber}
        setDetails({
          method: 'put',
          url: `${server}/blog/updatepost/${updatedPost._id}`,
          postDetails: updatedPost,
          headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "AccessType": "member",
                  "AccessFor": "thumbs"
                }
        })
      } else {
        navigate('/login')
        alert('please log in to like or dislike')
      }
    }
      //handler to take you from '/blog' to postpage itself and places focus on input to add comment
    const commentsHandle = postId => {
      if (token) {
        setCommentClicked(true)
        navigate(`/blog/post/${postId}`)
      } else {
        navigate('/login')
        alert('please log in to comment')
      }
    }

    const submitCommentHandle = async (event, postId) => {
      event.preventDefault()
      if (!token) {
        navigate('/login')
        alert('please log in to comment')
        return
      }
      if (comment==='') {
        alert('please provide a comment')
        return
      } else {
        const postToUpdate = posts.find(post => post._id === postId)
        const { Comments } = postToUpdate
        const now = new Date()
        const nowFormatted = date.format(now, 'DD/MM/YYYY HH:mm')
        const newComment = {Comment: comment, TimeComment: nowFormatted}
        const updatedComments = [...Comments, newComment]
        const updatedPost = {...postToUpdate, Comments: updatedComments}
        setDetails({
          method: 'put',
          url: `${server}/blog/updatepost/${postId}`,
          postDetails: updatedPost,
          headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "AccessType": "member",
                  "AccessFor": "comments"
                }
        })
      }
    }
  
  //DELETE -----****delete handler****------ 
    const deleteHandle = async (postId) => {
      if (token) {
        setDetails({
          method: 'delete',
          url: `${server}/blog/deletepost/${postId}`,
          postDetails: {data: null},
          headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "AccessType": "admin"
                }
        })
      } else {
        navigate('/login')
        alert('please log in as an administrator to delete')
      }
    }

    return (
        <DataContext.Provider value={{
            posts, filteredPosts, isLoading, deleteHandle, axiosError, 
            submitHandle, setNewPostText, newPostText, useInterval,
            newPostTitle, setNewPostTitle, search, blogRef, token,
            setSearch, thumbsHandle, orientation, touch, deviceClass,
            commentsHandle, comment, setComment, submitCommentHandle,
            inputRef, commentClicked, setCommentClicked,  
            navigate, click, clickHandler, navRef, location, 
            scrollHandler, sections, sectionActive, cloudName,
            LogoutButton, SignupForm, LoginForm
        }}>
            {children}
        </DataContext.Provider>
    )
}