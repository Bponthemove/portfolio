import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import { NavLinks } from "./NavLinks"
import { IconContext } from "react-icons"
import { FaBars, FaTimes } from 'react-icons/fa'
import '../css/nav.css'
import myImg from '../data/images/IMG_4104.jpg'

const Nav = () => {
    const { orientation, deviceClass, click, clickHandler } = useContext(DataContext)

    return (
        <>
{/* image absolute over the nav bar */}
        <img src={ myImg } alt='Me' className={ deviceClass !== 'mobile' ? "nav-img" : "nav-img nav-img-mob" }/>
        <nav className={ deviceClass !== 'mobile' ? 'nav-pc' : 'nav-mobile' }>
            { (deviceClass === 'mobile' || orientation === 'landscape') &&
            <div className="nav-personal-container">
                Bram peter van Zalk
            </div> }
            <IconContext.Provider value={{  color: '#fff2cf', 
                                            size: '3rem', 
                                            className: deviceClass === 'mobile' ? 'menu-icon' : 'hidden' 
                                            }}
            >
                <div onClick={ clickHandler } className="hamburger-container">
                    { click ? <FaTimes color='#fdfffc' /> : <FaBars color='#fdfffc' /> }
                </div>
            </IconContext.Provider>
            <ul className={ deviceClass !== 'mobile' ? 'nav-links-pc' : click ? 'nav-links-mobile-open' : 'nav-links-mobile-closed' }>
                { ['/', '#intro', '#about', '#skills', '#code', '/blog'].map((link, index) => 
                    <NavLinks 
                        clickHandler={clickHandler}
                        link={link} 
                        key={index} 
                    />
                ) }
            </ul>
        </nav>
        </>
    )
}

export default Nav
