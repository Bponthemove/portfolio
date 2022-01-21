import React, { useState } from 'react'

export const Comment = ({ comments }) => {
    const [showComments, setShowComments] = useState(false)

    const toggleComments = () => {
        setShowComments(!showComments)
    }
    
    return (
        <>
        {comments.length > 1  &&
            <button 
                className={ showComments ? 'comments-btn all-comments-btn' : 'comments-btn' }
                onClick={ toggleComments }    
            >
                { showComments ? 'show less comments' : 'show all comments' }
            </button>}
        {showComments && 
            comments.map((comment, index) =>  
            (   <div className='comment' key={index}>
                    <p className='comment-time'>{comment.TimeComment}</p>
                    <p className='comment-text'>{comment.Comment}</p>
                </div> ))
        }
        {!showComments && 
            comments.map((comment, index) =>  
            index === 0 &&
            (   <div className='comment' key={index}>
                    <p className='comment-time'>{comment.TimeComment}</p>
                    <p className='comment-text'>{comment.Comment}</p>
                </div> )
            )    
        }
        </>
    )
}
