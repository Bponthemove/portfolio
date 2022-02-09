import { useContext } from 'react'
import { NavLink as Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { DataContext } from '../context/DataContext'

export const NavLinks = ({ link, clickHandler }) => {
    const { location, sectionActive, deviceClass } = useContext(DataContext)   
    
    return (
        <li className='nav-link'>
            {link === '/' || link==='/blog' ? 
//navLink does not do hash 'anchor' links, so use hashLink for internal page links
                <Link   
                    end to={    link === '/' ? '/' 
                                : link === '/blog' ? '/blog' : null } 
//dimmed class to dimm blog when you are home and vice versa
                    id={    location.pathname === '/' && link === '/' && (sectionActive === 'home' || sectionActive === 'intro' || sectionActive === 'skills') ? 'selected'
                            : location.pathname === '/' && link === '/' && (sectionActive === 'about' || sectionActive === 'code') ? 'selected-orange'
                            : location.pathname === '/blog' && link === 'blog' ? 'selected' 
                            : location.pathname === '/' && link === '/blog' ? 'dimmed'
                            : location.pathname !== '/' && link === '/' ? 'dimmed' : '' }
                    onClick={   deviceClass === 'mobile' ? clickHandler 
                                : deviceClass !== 'mobile' && link === '/' ? () => window.scrollTop(0) 
                                : null }
                >
                    { link === '/' ? 'Home' : 'Blog' }
                </Link>
                :
                <HashLink 
//hashLink does not have active property like navLink, so imitate it to add selected class
                    to={    link === '#intro' ? '/#intro'
                            : link === '#about' ? '/#about'
                            : link === '#skills' ? '/#skills' : '/#code' }
                    id ={   location.pathname === '/' && link === '#intro' && sectionActive === 'intro' ? 'selected'
                            : location.pathname === '/' && link === '#about' && sectionActive === 'about' ? 'selected-orange'
                            : location.pathname === '/' && link === '#skills' && sectionActive === 'skills' ? 'selected'
                            : location.pathname === '/' && link === '#code' && sectionActive === 'code' ? 'selected-orange' 
                            : location.pathname !== '/' ? 'dimmed' : '' }
                    className='hash-link'
                >
                    {   link === '#intro' ? 'Intro' 
                        : link === '#about' ? 'About'
                        : link === '#skills' ? 'Skills' : 'Code' }
                </HashLink>
            }
        </li>
    )
}
