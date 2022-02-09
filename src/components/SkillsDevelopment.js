import React, { useContext } from 'react'
import { IconContext } from 'react-icons/lib'
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaGit, FaSass } from 'react-icons/fa'
import { SiJavascript, SiMongodb, SiExpress } from 'react-icons/si'
import { DataContext } from '../context/DataContext'

export const SkillsDevelopment = () => {
    const { orientation, deviceClass } = useContext(DataContext)

    return (
        <IconContext.Provider
            value= {    deviceClass === 'laptop/tablet' && orientation === 'landscape' ? { size: '2.5em', color: '#4880f6' }
                        : deviceClass === 'mobile' ? { size: '1.5em', color: '#4880f6'}
                        : { size: '4.5em', color: '#4880f6' }
                    }
        >
            <div className={deviceClass !== 'pc' && orientation === 'landscape' ? 'dev-skills-container dev-skills-container-laptop' : 'dev-skills-container'}>
                <div className='skills-dev'>
                    <FaHtml5/>
                    <p>HTML 5</p>
                </div>
                <div className='skills-dev'> 
                    <FaCss3Alt/>
                    <p>CSS 3</p>
                </div>
                <div className='skills-dev'> 
                    <FaSass/>
                    <p>Sass</p>
                </div>
                <div className='skills-dev'>
                    <SiJavascript/>
                    <p>Javascript</p>
                </div>
                <div className='skills-dev'>
                    <FaReact/>
                    <p>React</p>
                </div>
                <div className='skills-dev'>
                    <SiMongodb/>
                    <p>Mongo</p>
                </div>
                <div className='skills-dev'>
                    <SiExpress/>
                    <p>Express</p>
                </div>
                <div className='skills-dev'>
                    <FaNodeJs/>
                    <p>Node</p>
                </div>
                <div className='skills-dev'>
                    <FaGithub/>
                    <p>Github</p>
                </div>
                <div className='skills-dev'>
                    <FaGit/>
                    <p>Git</p>
                </div>
            </div>
        </IconContext.Provider>
    )
}




