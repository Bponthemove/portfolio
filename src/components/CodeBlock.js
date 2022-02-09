import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'
import { Image } from 'cloudinary-react'
import { code } from '../data/textData'

export const CodeBlock = () => {
    const { cloudName, touch, deviceClass } = useContext(DataContext)
    const [hover, setHover] = useState(false)
    const [target, setTarget] = useState({
        top: null,
        left: null
    })
    
    return (
        code.map((item, index) => 
            <div key={ index } className={  index % 2 === 0 && deviceClass !== 'mobile' && !touch ? 'code-block-container' 
                                            : index % 2 !== 0 && deviceClass !== 'mobile' && !touch ? 'code-block-container code-block-container-right'
                                            : index % 2 === 0 && touch && deviceClass !== 'mobile' ? 'code-block-container code-block-container-portrait code-block-container-touch'
                                            : index % 2 !== 0 && touch && deviceClass !== 'mobile' ? 'code-block-container code-block-container-right code-block-container-portrait code-block-container-touch'
                                            : 'code-block-container code-block-container-right code-block-container-portrait code-block-container-touch' 
                                        }
            >
                { !touch && <div className={ hover ? 'tooltip tooltip-visible' : 'tooltip' } style={{top: target.top, left: target.left}}>Go to App</div> }
                <a  href={ item.appLink } target="_blank" rel="noreferrer" className='code-img-container' 
                    onMouseMove={e => {
                        setTarget({
                            top: e.clientY - 300,
                            left: e.clientX -60
                        })
                        setHover(true)
                    }}
                    onMouseLeave={() => {
                        setTarget({
                            top: null,
                            left: null
                        })  
                        setHover(false)
                    }}
                >
                    { cloudName && 
                        <Image  alt={ `img${ index }` } 
                                className='img-code' 
                                cloudName={ cloudName }
                                publicId={ item.img}
                        /> }
                </a>
                <div className='code-block-text-container'>
                    <h5 className='code-block-title'>{ item.title }</h5>
                    <p className='code-block-text'>{ item.text }</p>
                    <div className='code-block-link-container'>
                        <a href={ item.codelink1 } target="_blank" rel="noreferrer">{ item.codelink1Text }</a>
                        <a href={ item.codelink2 } target="_blank" rel="noreferrer">{ item.codelink2Text }</a>
                    </div>
                </div>    
            </div>
        )
    )
        
}

