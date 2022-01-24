import { PostInList } from '../components/PostInList'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import '../css/blog.css'
import { Link } from 'react-router-dom'
import { blog } from '../data/textData'
import mern from '../data/images/MERN-stack.png'

const Blog = () => {
    const { deviceClass, orientation, click, search, setSearch, posts, filteredPosts, isLoading, fetchError, blogRef } = useContext(DataContext)

    return (
        <>
            {isLoading && <p>....is currently loading....</p>}
            {fetchError && <p>{ fetchError }</p>}
            {!isLoading && posts.length === 0 && <p>No posts to display</p>}
            {!isLoading && posts.length !== 0 &&
                <main   className={ deviceClass === 'mobile' ? 'main-blog main-blog-mobile' : 'main-blog' } 
                        id={ click ? 'mainNavOpen' : 'mainNavClosed' }
                        ref={blogRef}
                >
                    <div className={    deviceClass !== 'pc' && orientation === 'landscape' ? 'main-left main-left-laptop' 
                                        : deviceClass === 'mobile' ? 'main-left main-left-mobile' : 'main-left' }>
                        <h2>{ blog.h2 }</h2>
                        {/* <div className={ width < 1200 && landscape ? 'main-left-img main-left-img-laptop' : 'main-left-img' }/> */}
                        <p>{ blog.p }</p>
                        <img src={ mern } alt='MERN stack' className='main-left-image'/>
                    </div>
                    <div className='main-right'>
                        <ul className={ deviceClass === 'mobile' ? 'main-list main-list-mob' : 'main-list' }>
                            { search === '' ? 
                                posts.map(post => (
                                    <PostInList
                                        key={ post._id }  
                                        post={ post }
                                    />    
                                )) :
                                filteredPosts.map(filteredPost => (
                                    <PostInList
                                        key={ filteredPost._id }  
                                        post={ filteredPost }
                                    />
                                ))
                            }
                        </ul>
                        <div className='main-right-bottom-container'>
                            <Link className='new-post-button' to='/newpost'>New Post</Link>
                            <form 
                                onSubmit={ e => e.preventDefault() }
                                className={ deviceClass === 'mobile' ? 'search-mob search' : 'search search-pc' }
                                >
                                <label htmlFor='search'>Search Posts</label>
                                <input
                                    type='text'
                                    id='input'
                                    placeholder='search'
                                    value={ search }
                                    onChange={ e => { 
                                        // if (/^[a-zA-Z]+$/.test(e.target.value)) { (does not let me delete first character??)
                                            setSearch(e.target.value) 
                                        } 
                                    }
                                />
                            </form>
                        </div>
                    </div>
                </main>
            }          
        </>
    )
}

export default Blog
