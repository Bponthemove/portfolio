import React, { useContext, useState } from 'react'
import { Image } from 'cloudinary-react'
import { DataContext } from '../context/DataContext'

export const AboutItem = ({ pastTrades }) => { 
    const [index, setIndex] = useState(0)
    const { orientation, deviceClass, touch, cloudName } = useContext(DataContext)

    const clickHandler = btn => {
        if (btn === 'next' && index < 4) setIndex(prev => prev + 1)
        if (btn === 'previous' && index > 0) setIndex(prev => prev - 1)
        if (btn === 'next' && index === 4) setIndex(0)
        if (btn === 'previous' && index === 0) setIndex(4)
    }
   
    return (
        <>
            <div className='about-btn-container'>
                <button id='previous' onClick={e => clickHandler(e.target.id) }>prev</button>
                <button id='next' onClick={e => clickHandler(e.target.id) }>next</button>
            </div>
            <div    key={pastTrades[index].title} 
                    className={ deviceClass === 'pc' && !touch ? 'about-item-container about-item-container-grid' 
                                : deviceClass === 'laptop/tablet' && !touch ? 'about-item-container about-item-container-grid about-item-container-landscape'
                                : touch && deviceClass !== 'mobile' && orientation === 'landscape' ? 'about-item-container about-item-container-flex about-item-container-landscape' 
                                : deviceClass === 'mobile' && orientation === 'portrait' ? 'about-item-container about-item-container-flex about-item-container-flex-portrait about-item-container-mob'
                                : 'about-item-container about-item-container-flex about-item-container-flex-portrait'
                            }
            > 
                { deviceClass !== 'mobile' &&
                    <div className={    !touch ? 'about-img-container' 
                                        : touch && orientation === 'portrait' ? 'about-img-container about-img-container-touch-portrait'
                                        :'about-img-container about-img-container-touch-landscape' }> 
                        { cloudName && deviceClass !== 'mobile' &&
                            <Image  cloudName={ cloudName }  
                                    className={ deviceClass === 'laptop/tablet' && orientation === 'landscape' && !touch ? 'image1 image1-laptop' 
                                                : touch && deviceClass !== 'mobile' && orientation === 'portrait' ? 'image1 image1-portrait'
                                                : touch && deviceClass !== 'mobile' && orientation === 'landscape' ? 'image1 image1-landscape' 
                                                : 'image1' } 
                                    publicId={ pastTrades[index].img1 } 
                                    alt={ pastTrades[index].img1 }
                            /> }
                        { cloudName && deviceClass !== 'mobile' &&
                            <Image  cloudName={ cloudName }  
                                    className={ orientation === 'landscape' && deviceClass === 'laptop/tablet' && !touch ? 'image2 image2-laptop' 
                                                : touch && deviceClass !== 'mobile' && orientation === 'portrait' ? 'image2 image2-portrait'
                                                : touch && deviceClass !== 'mobile' && orientation === 'landscape' ? 'image2 image2-landscape' 
                                                : 'image2' } 
                                    publicId={ pastTrades[index].img2 } 
                                    alt={ pastTrades[index].img2 }
                            /> }                    
                    </div>
                }
                <div className={    orientation === 'portrait' && !touch ? 'about-text-container about-text-container-landscape' 
                                    : touch ? 'about-text-container about-text-container-flex' : 'about-text-container' }>
                    <h5>{ pastTrades[index].title }</h5>
                    <p>{ pastTrades[index].text }</p>
                </div>
            </div>
        </>
    )    
    
}


