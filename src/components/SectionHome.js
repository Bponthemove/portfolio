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
                            className={ index % 2 !== 0 && orientation === 'landscape' ? 'section section-toggle' 
                                        : index % 2 !== 0 && orientation === 'portrait' ? 'section section-toggle section-portrait' 
                                        : index % 2 === 0 && orientation === 'portrait' ? 'section section-portrait'
                                        : 'section' }
                >
                    <h1 className={deviceClass !== 'mobile' ? 'section-h1': 'section-h1 section-h1-mob' }>
                        {   link === 'intro' ? text.intro.h1
                            : link === 'about' ? text.about.h1
                            : link === 'skills' ? text.skills.h1
                            : text.code.h1    
                        }
                    </h1>
                    { deviceClass !== 'mobile' || (deviceClass === 'mobile' && link === 'intro') &&
                    <h3 className= 'section-h3' >
                        {   link === 'intro' ? text.intro.h3
                            : link === 'about' ? text.about.h3
                            : link === 'skills' ? text.skills.h3
                            : text.code.h3    
                        }
                    </h3> }
                    <p className='section-p'>
                        {   link === 'intro' ? text.intro.p
                            : link === 'about' ? text.about.p
                            : link === 'skills' ? text.skills.p
                            : text.code.p    
                        }
                    </p>
                    {link === 'intro' &&
                        <Hobbies/>
                    }
                    {link === 'about' &&
                        <AboutItem pastTrades={pastTrades}/>
                    }
                    {link === 'skills' && 
                        <div className='skills-list-container'>
                            <SkillsDevelopment/>
                            <SkillsLife/>
                        </div>    
                    }
                    {link === 'code' && 
                        <div className='code-container'>
                            <CodeBlock/>    
                        </div>}
                </section>
            )
}

export default SectionHome
