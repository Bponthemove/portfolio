import { useContext } from 'react'
import { FaTrashAlt, FaRegThumbsUp, FaRegThumbsDown ,FaRegComment } from 'react-icons/fa'
import { DataContext } from '../context/DataContext'
import '../css/icons.css'

export const Icons = ({ postId, likes, dislikes, comments }) => {
    const { deleteHandle, thumbsHandle, commentsHandle } = useContext(DataContext)
    

    return (
        <div className='icons-container-inner'>   
            <div>
                <FaRegThumbsUp className='icon' onClick={() => thumbsHandle(postId, 'up')}/>
                <span>{likes}</span>
            </div>
            <div>
                <FaRegThumbsDown className='icon' onClick={() => thumbsHandle(postId, 'down')}/>
                <span>{dislikes}</span>
            </div>
            <div>
                <FaRegComment className='icon' onClick={() => commentsHandle(postId)}/>
                <span>{comments}</span>
            </div>
            <div>
                <FaTrashAlt className='icon' id='trash' onClick={() => deleteHandle(postId)}/>
            </div>
        </div>
    )
}