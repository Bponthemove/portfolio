import React, { useContext } from 'react'
import { IconContext } from 'react-icons/lib'
import { FaLinkedin, FaGithub, } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import '../css/footer.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Footer = () => {
    const { loggedIn, LogoutButton } = useContext(DataContext)
    
    return (
        <footer>
            <div className='copyright'>
                Copyright Bponthemove 2021
            </div>
            <div className='contact-container'>
                <IconContext.Provider value={ {size:'2rem', color:'eec170'} }>
                    <a href='https://www.linkedin.com/in/bram-peter-van-zalk-6b1401215' target="_blank" rel="noreferrer">
                        <FaLinkedin/>
                    </a>
                    <a href='https://github.com/Bponthemove' target="_blank" rel="noreferrer">
                        <FaGithub/>
                    </a>
                    <Link to='#' onClick={  e => {
                                                window.location = "mailto:bpvanzalk@hotmail.com"
                                                e.preventDefault()
                                            }}
                    >
                        <GrMail/>
                    </Link>
                </IconContext.Provider>
            </div>
            { (loggedIn && LogoutButton !== undefined) && <LogoutButton className='logOutBtn'/> }
        </footer>
    )
}

export default Footer
