import { useContext } from 'react'
import { Hobbies } from './Hobbies'
import { AboutItem } from './AboutItem'
import { SkillsDevelopment } from './SkillsDevelopment'
import { SkillsLife } from './SkillsLife'
import { CodeBlock } from './CodeBlock'
import { pastTrades, text } from '../data/textData'
import { DataContext } from '../context/DataContext'

const SectionHome = ({ section, index }) => {
    const { link, ref } = section
    const { deviceClass, orientation } = useContext(DataContext)
            
            return (
                <section    id={link}
                            ref={ref}
                            className={ index % 2 !== 0  ? 'section section-toggle' : 'section' }
                >
                    {link !== 'intro' &&
                        <h1>
                            {   link === 'home' ? text.intro.h1.top
                                : link === 'about' ? text.about.h1
                                : link === 'skills' ? text.skills.h1
                                : text.code.h1    
                            }
                        </h1>
                    }
                    { link === 'home' && <h2>{ text.intro.h1.bottom }</h2>}
                    { (deviceClass !== 'mobile' || (deviceClass === 'mobile' && link === 'intro')) &&
                    <h3>
                        {   link === 'home' ? ''
                            : link === 'intro' ? text.intro.h3
                            : link === 'about' ? text.about.h3
                            : link === 'skills' ? text.skills.h3
                            : text.code.h3    
                        }
                    </h3> }
                    <p className={deviceClass === 'laptop/tablet' && orientation === 'portrait' ? 'section__p section__p__portrait' : 'section__p' }>
                        {   link === 'home' ? ''
                            : link === 'intro' ? text.intro.p1
                            : link === 'about' ? text.about.p1
                            : link === 'skills' ? text.skills.p1
                            : text.code.p1
                        }
                    </p>
                    {deviceClass !== 'mobile' && link === 'intro' &&
                    <>
                        <p className={deviceClass === 'laptop/tablet' && orientation === 'portrait' ? 'section__p section__p__portrait' : 'section__p' }>
                            { text.intro.p2 }
                        </p>
                        <p className={deviceClass === 'laptop/tablet' && orientation === 'portrait' ? 'section__p section__p__portrait' : 'section__p' }>
                            { text.intro.p3 }
                        </p>                    
                    </>
                    }
                    {link === 'intro' &&
                        <Hobbies/>
                    }
                    {link === 'about' &&
                        <AboutItem pastTrades={pastTrades}/>
                    }
                    {link === 'skills' && 
                        <div className='skills-list-container'>
                            <SkillsLife/>
                            <SkillsDevelopment/>
                        </div>    
                    }
                    {link === 'code' && 
                        <div className='code-container'>
                            <div className='code-container-inside'>
                                <CodeBlock/>
                            </div>    
                        </div>}
                </section>
            )
}

export default SectionHome
