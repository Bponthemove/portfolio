import { Hobbies } from './Hobbies'
import { AboutItem } from './AboutItem'
import { SkillsDevelopment } from './SkillsDevelopment'
import { SkillsLife } from './SkillsLife'
import { CodeBlock } from './CodeBlock'
import { pastTrades, text } from '../data/textData'

const SectionHome = ({ section, index }) => {
    const { link, ref } = section
            
            return (
                <section    id={link}
                            ref={ref}
                            className={index % 2 !== 0 ? 'section section-toggle' : 'section'}
                >
                    <h1 className='section-h1'>
                        {   link === 'intro' ? text.intro.h1
                            : link === 'about' ? text.about.h1
                            : link === 'skills' ? text.skills.h1
                            : text.code.h1    
                        }
                    </h1>
                    <h3 className='section-h3'>
                        {   link === 'intro' ? text.intro.h3
                            : link === 'about' ? text.about.h3
                            : link === 'skills' ? text.skills.h3
                            : text.code.h3    
                        }
                    </h3>
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
