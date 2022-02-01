import { useContext, useRef, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { useInterval } from '../hooks/useInterval'
import '../css/newPost.css'

const NewPost = () => {
    const { submitHandle, setNewPostText, newPostText, newPostTitle, setNewPostTitle, deviceClass, orientation, click } = useContext(DataContext)
    const titleRef = useRef()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        titleRef.current.focus()
    }, [])

    useInterval(() => {
        setLoading(false)
    }, [200])

    return (
        <main   className='main-new-post'
                id={click ? 'mainNavOpen' : 'mainNavClosed'}>
            <form
                className={ deviceClass === 'laptop/tablet' && orientation ==='landscape' ? 'new-post-form new-post-form-laptop' 
                            : orientation === 'portrait' ? 'new-post-form new-post-form-portrait' : 'new-post-form' } 
            >
                <h1 className={!loading ? 'new-blog-header is-active' : 'new-blog-header'}>New Blog</h1>
                { deviceClass !== 'laptop/tablet' && <label htmlFor='Title new post'>Title: </label> }
                <input
                    type='text'
                    className='input-title'
                    placeholder='Title'
                    ref={titleRef}
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                />
                <textarea
                    type='text'
                    className='input-text'
                    placeholder='Post'
                    value={newPostText}
                    onChange={e => setNewPostText(e.target.value)}
                />
                <div className={!loading ? 'new-blog-btn-container is-active' : 'new-blog-btn-container'}>
                    <button
                        className={deviceClass !== 'mobile' ? 'new-blog-btn' : 'new-blog-btn new-blog-btn-mobile'}
                        type='submit'
                        onClick={submitHandle}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </main>
    )
}

export default NewPost
