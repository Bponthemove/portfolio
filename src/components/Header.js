import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { headerText } from "../data/textData";
import '../css/header.css'

const Header = () => {
    const { deviceClass, location, sectionActive, useInterval } = useContext(DataContext)
    const [qouteText1, setQouteText1] = useState(headerText[0].text1)
    const [qouteText2, setQouteText2] = useState(headerText[0].text2)
    // const [count, setCount] = useState(1)

    useInterval(() => {
        const random = Math.floor(Math.random() * 11)
        // if (count < headerText.length - 1) setCount(prev => prev + 1)
        // if (count === headerText.length - 1) setCount(0)
        setQouteText1(headerText[random].text1)
        setQouteText2(headerText[random].text2)
    }, 3500)

    return (
        <>
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
        </>
    )
}

export default Header