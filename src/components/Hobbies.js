import { useState, useContext, useEffect }from 'react'
import { Image } from 'cloudinary-react'
import { DataContext } from '../context/DataContext'
import { hobby } from '../data/textData'

export const Hobbies = () => {
    const [hobbyImg1, setHobbyImg1] = useState(hobby[0].img1)
    const [hobbyImg2, setHobbyImg2] = useState(hobby[0].img2)
    const [hobbyImg3, setHobbyImg3] = useState(hobby[0].img3)
    const [hobbyImg4, setHobbyImg4] = useState(hobby[0].img4)
    const [hobbyText, setHobbyText] = useState(hobby[0].text)
    const [count, setCount] = useState(1)
    const [delay, setDelay] = useState(null)
    const { deviceClass, orientation, useInterval, sectionActive, location, cloudName } = useContext(DataContext)

// set delay to null to stop the roll when we are in a different section, delay===null will stop the useInterval hook and stop the css animation,
// delay===8000 will reset both to an 8s cycle.
    useEffect(() => {
        sectionActive === 'intro' && location.pathname === '/' ? setDelay(8000) : setDelay(null)
    }, [sectionActive, location])

    useInterval(() => {        
        if (count < hobby.length) setCount(prev => prev + 1)
        if (count === hobby.length - 1) setCount(0)
        setHobbyImg1(hobby[count].img1)
        setHobbyImg2(hobby[count].img2)
        setHobbyImg3(hobby[count].img3)
        setHobbyImg4(hobby[count].img4)
        setHobbyText(hobby[count].text)
    }, delay)
    

    return (
        <>
            { deviceClass === 'mobile' && <p className='hobbies-intro-span-static'>Things I love to do in my time off..</p>}
            <div className='hobbies-container'>
                <div className='hobbies-background'>
                </div>
                <div    className='hobbies-intro-appear' 
                        key={ hobbyImg1 }
                >
                    { deviceClass !== 'mobile' && <span className='hobbies-intro-span-static'> Things I love to<br/>do in my time off.. </span> }
                    <span className={ delay === null ? 'hobbies-intro-span-rolling' : 'hobbies-intro-span-rolling hobbies-animation' } >
                        { hobbyText }
                    </span>
                    <p className='hobbies-intro-line'></p>
                    { cloudName &&
                        <Image  cloudName={ cloudName }
                                quality='auto'
                                className={ delay === null ? 'hobbies-intro-img1' : 'hobbies-intro-img1 hobbies-animation' }  
                                publicId={ orientation === 'landscape' ? hobbyImg1 : hobbyImg3 } 
                                alt={ hobbyImg1 }
                        /> }
                        <p className='hobbies-intro-line'></p>
                    { cloudName &&
                        <Image  cloudName={ cloudName }
                                quality='auto'  
                                className={ delay === null ? 'hobbies-intro-img2' : 'hobbies-intro-img2 hobbies-animation' }  
                                publicId={ orientation === 'landscape' ? hobbyImg2 : hobbyImg4 } 
                                alt={ hobbyImg2 }
                    /> }
                </div>
            </div>
        </>
    )
}


