import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import SectionHome from '../components/SectionHome'
import '../css/home.css'
import '../css/index.css'

const Home = () => {
    const { scrollHandler, sections, click } = useContext(DataContext)

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
