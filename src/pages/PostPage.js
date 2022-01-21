import React, { useState, useEffect, useContext } from 'react'
import { IconContext } from 'react-icons'
import { DataContext } from '../context/DataContext'
import { Icons } from '../components/Icons'
import { Comment } from '../components/Comment'
import { Link, useParams } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import '../css/postpage.css'

const PostPage = () => {
    const { deviceClass, orientation, posts, comment, setComment, submitCommentHandle, inputRef, commentClicked, setCommentClicked, loggedIn, navigate, click } = useContext(DataContext)
    const { id } = useParams()
    const [post, setPost] = useState(null)
    
        //find post and focus on comment if clicked on comment link
    useEffect(() => {
        setPost(posts.find(post => post._id === id))
        function wait() {
            setTimeout(() => {
                inputRef.current.focus()
            }, 1000);
        }
        if (commentClicked) wait()
        return () => {
            setPost(null)
            clearTimeout(wait)
            setCommentClicked(false)
        }
    }, [posts])

    return (
        <>
            {!post && <p>...is loading...</p>}
            {post && 
                <main id={ click ? 'mainNavOpen' : 'mainNavClosed' }>
                    <div className={    deviceClass !== 'pc' && orientation === 'landscape' ? 'postpage-post postpage-post-max-height postpage-post-centered' 
                    
                                        : orientation === 'landscape' ? 'postpage-post postpage-post-centered' : 'postpage-post' 
                        }
                    >
                        <div className='postpage-post-header'>
                            <h1>{ post.Title }</h1>
                            <Link to='/blog'><ImCross size='1.6rem'/></Link>
                        </div>
                        <div className='post-overflow-container'>
                            <h4>{ post.Time }</h4>
                            <p>{ post.Text }</p>
                            <div className={ deviceClass === 'mobile' ? 'icons-container-postpage icons-container-postpage-mob' : 'icons-container-postpage icons-container-postpage-pc' }>
                                <IconContext.Provider  
                                    value= { deviceClass === 'mobile' ? { size: '1.5rem', color: '#2f4550' } :
                                                            { size: '1rem', color: '#2f4550' } }
                                >
                                <Icons  postId={ post._id } 
                                        likes={ post.Likes } 
                                        comments={ post.Comments.length } 
                                        //show comment input and open all previous comments
                                        dislikes={ post.Dislikes }
                                />
                                </IconContext.Provider> 
                            </div>
                            <form 
                                
                                className={ deviceClass === 'mobile' ? 'comment-form comment-form-mob' : 'comment-form' }
                                >
                                <label htmlFor='comment'>Comment</label>
                                <input
                                    type='text'
                                    id='inputComment'
                                    placeholder='add comment'
                                    ref={ inputRef }
                                    value={ comment }
                                    onClick={ !loggedIn ? () => navigate('/login') : null }
                                    onChange={ e => setComment(e.target.value) }
                                />
                                <button type='submit' onClick={e => submitCommentHandle(e, post._id)}>Post</button>
                            </form>
                            <div className={ deviceClass !== 'mobile' ? 'comments-container' : 'comments-container comments-container-mob' }>
                                <Comment comments={ post.Comments }/>    
                            </div>
                        </div> 
                    </div>
                </main>
            }
        </>
    )
}

export default PostPage
