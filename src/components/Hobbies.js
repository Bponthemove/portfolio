import { useState, useContext }from 'react'
import { DataContext } from '../context/DataContext'
import { hobby } from '../data/textData'

export const Hobbies = () => {
    const [hobbyImg1, setHobbyImg1] = useState(hobby[0].img1)
    const [hobbyImg2, setHobbyImg2] = useState(hobby[0].img2)
    const [hobbyImg3, setHobbyImg3] = useState(hobby[0].img3)
    const [hobbyImg4, setHobbyImg4] = useState(hobby[0].img4)
    const [hobbyText, setHobbyText] = useState(hobby[0].text)
    const [count, setCount] = useState(1)
    const { deviceClass, orientation, useInterval } = useContext(DataContext)

    useInterval(() => {
        if (count < hobby.length) setCount(prev => prev + 1)
        if (count === hobby.length - 1) setCount(0)
        setHobbyImg1(hobby[count].img1)
        setHobbyImg2(hobby[count].img2)
        setHobbyImg3(hobby[count].img3)
        setHobbyImg4(hobby[count].img4)
        setHobbyText(hobby[count].text)
    }, 8000)

    return (
        <div className={ deviceClass === 'laptop/tablet' && orientation === 'landscape' ? 'hobbies-container hobbies-container-laptop' : 'hobbies-container' }>
            <div className='hobbies-background'>
            </div>
            <div className='hobbies-intro-appear' key={ hobbyImg1 }>
                Things I love to do<br/>in my time off.. 
                <span className='hobbies-intro-span'>
                    { hobbyText }
                </span>
                <p className='hobbies-intro-line'></p>
                <img    className='hobbies-intro-img1' 
                        src={ orientation === 'landscape' ? hobbyImg1 : hobbyImg3 } 
                        alt={ hobbyImg1 }
                />
                <p className='hobbies-intro-line'></p>
                <img    className='hobbies-intro-img2' 
                        src={ orientation === 'landscape' ? hobbyImg2 : hobbyImg4 } 
                        alt={ hobbyImg2 }/>
            </div>
        </div>
    )
}


