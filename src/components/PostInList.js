import { useContext } from 'react'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import { DataContext } from '../context/DataContext'

export const PostInList = ({ post }) => {
    const { deviceClass, orientation } = useContext(DataContext)

    return (
            <li className={ deviceClass === 'mobile' ? 'link link-mobile' : 'link link-pc' }>
                <div className={ deviceClass === 'mobile' ? 'link-header link-header-mobile' : 'link-header' }>  
                    <Link to={ `/post/${post._id}` }>
                        <h4 className='post-title'>{ post.Title }</h4>
                    </Link>
                    <div className='icons-container'>
                        { deviceClass !== 'mobile' && 
                        <IconContext.Provider value= {{ size: '1rem', color: '#fdfffc' }} >
                            <Icons  postId={post._id} 
                                    likes={post.Likes} 
                                    comments={post.Comments.length} 
                                    dislikes={post.Dislikes}
                            />
                        </IconContext.Provider>
                        }     
                    </div>
                </div>
                <div className='post-details-container'>
                    <Link to={ `/post/${post._id}` }>
                        <p className='post-time post-item'>{post.Time}</p>
                        <p className={ deviceClass !== 'pc' && orientation === 'landscape' ? 'post-text post-item post-text-laptop' : 'post-text post-item' }>
                            { post.Text }
                        </p>
                    </Link>
                </div>
                { deviceClass === 'mobile' && 
                    <div className='icons-list-container-mob'>
                        <IconContext.Provider value= {{ size: '1.2rem', color: '#586f7c' }} >
                            <Icons  postId={post._id} 
                                    likes={post.Likes} 
                                    comments={post.Comments.length} 
                                    dislikes={post.Dislikes}
                            />
                        </IconContext.Provider>
                    </div>
                }  
            </li>
    )
}
