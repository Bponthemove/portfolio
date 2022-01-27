import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import { NavLinks } from "./NavLinks"
import { IconContext } from "react-icons"
import { FaBars, FaTimes } from 'react-icons/fa'
import '../css/nav.css'
import { Image } from 'cloudinary-react'

const Nav = () => {
    const { orientation, deviceClass, click, clickHandler, cloudName, navRef} = useContext(DataContext)

    return (
        <>
            { cloudName && deviceClass !== 'mobile' &&
                <Image  cloudName={ cloudName }
                        publicId="Portfolio/images/IMG_4104_rmar02.jpg" 
                        alt='Me'
                        quality='auto'
                        className="nav-img"
                /> 
            }
            { !cloudName && deviceClass !== 'mobile' &&
                <div className='nav-img nav-img-loading'>...</div>
            }
            <nav ref={ navRef } className={ deviceClass !== 'mobile' ? 'nav-pc' : 'nav-mobile' }>
                { (deviceClass === 'mobile' || orientation === 'landscape') &&
                <div className={ deviceClass === 'mobile' ? 'nav-personal-container nav-personal-container-mob' : 'nav-personal-container' }>
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
