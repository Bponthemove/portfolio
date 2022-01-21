import React from 'react'
import { lifeSkills } from '../data/textData'

export const SkillsLife = () => {
    return (
        <div className='life-skills-container'>
            { lifeSkills.map((skill, index) => (
                <p  className='life-skill' 
                    key={index}
                >
                    {skill}
                </p>
            ))}
        </div>
    )
}

