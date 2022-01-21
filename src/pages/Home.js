import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import SectionHome from '../components/SectionHome'
import '../css/home.css'

const Home = () => {
    const { scrollHandler, sections } = useContext(DataContext)

    return (
        <main   className='main-home'
                onScroll={scrollHandler}
        >
            {sections.map((section, index) =>
                <SectionHome    section={section} 
                                key={index}
                                index={index}
                />
            )}
        </main>
    )
}

export default Home
