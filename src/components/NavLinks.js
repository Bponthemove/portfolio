import { useContext } from 'react'
import { NavLink as Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { DataContext } from '../context/DataContext'

export const NavLinks = ({ link, clickHandler }) => {
    const { location, sectionActive, deviceClass } = useContext(DataContext)   
    
    return (
        <li>
            {link === '/' || link==='/blog' ? 
//navLink does not do hash 'anchor' links, so use hashLink for internal page links
                <Link   
                    end to={ link === '/' ? '/' 
                            : link === '/blog' ? '/blog' : null } 
//dimmed class to dimm blog when you are home and vice versa
                    className={ location.pathname === '/' && link === '/blog' ? 'nav-link dimmed'
                                : location.pathname !== '/' && link === '/' ? 'nav-link dimmed' 
                                : 'nav-link' }
//id to overwrite active class for different background color when scrolling
                    // id={link}
                    id={link === '/' &&  (sectionActive === 'about' || sectionActive === 'code') ? 'selected-orange' : ''}
                    onClick={ deviceClass === 'mobile' ? clickHandler : null }
                >
                    { link === '/' ? 'Home' : 'Blog' }
                </Link>
                :
                <HashLink 
//hashLink does not have active property like navLink, so imitate it to add selected class
                    to={    link === '#intro' ? '/#intro'
                            : link === '#about' ? '/#about'
                            : link === '#skills' ? '/#skills' : '/#code' }
                    // id={link}
                    className={
//mimic active links 
                        location.pathname !== '/' ? 'nav-link nav-hashlink off'
// when scrolling make links active
                        : link === '#intro' && sectionActive === 'intro' && location.pathname === '/' ?  'nav-link nav-hashlink selected'
                        : link === '#about' && sectionActive === 'about' ? 'nav-link nav-hashlink selected selected-orange'
                        : link === '#skills' && sectionActive === 'skills' ? 'nav-link nav-hashlink selected'
                        : link === '#code' && sectionActive === 'code' ? 'nav-link nav-hashlink selected selected-orange' 
                        : 'nav-link nav-hashlink' }
                >
                    { link === '#intro' ? 'Intro' 
                        : link === '#about' ? 'About'
                        : link === '#skills' ? 'Skills' : 'Code' }
                </HashLink>
            }
        </li>
    )
}
