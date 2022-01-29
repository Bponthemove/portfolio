import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { headerText } from "../data/textData";
import '../css/header.css'

const Header = () => {
    const { deviceClass, location, sectionActive, useInterval } = useContext(DataContext)
    const [qouteText1, setQouteText1] = useState(headerText[0].text1)
    const [qouteText2, setQouteText2] = useState(headerText[0].text2)
    const [delay, setDelay] = useState(null)

    //to unmount when header is not rendered in mobile
    useEffect(() => {
        deviceClass === 'mobile' ? setDelay(null) : setDelay(3500)
    }, [deviceClass])

    useInterval(() => {
        const random = Math.floor(Math.random() * 11)
        setQouteText1(headerText[random].text1)
        setQouteText2(headerText[random].text2)
    }, delay)

    return (
        <>
        { deviceClass !== 'mobile' &&
            <header className={ deviceClass === 'mobile' ? 'header-mobile'
                                : location.pathname === '/blog' || location.hash === '#login' ? 'header-pc'
                                : sectionActive === 'intro' || sectionActive ===  'skills' ? 
                                'header-pc' : 'header-pc header-background-toggle'}
            >  
                <div className="header-text-container">
                    <h1 className="header-text1" key={ qouteText1 }>{ qouteText1 }</h1>
                    <h1 className="header-text2" key={ qouteText2 }>{ qouteText2 }</h1>
                </div>
            </header>
        }
        </>
    )
}

export default Header