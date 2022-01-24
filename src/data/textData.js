//intro images landscape 
import outdoors1 from '../data/images/intro/outdoors1.jpg'
import outdoors2 from '../data/images/intro/outdoors2.jpg'
import family1 from '../data/images/intro/family_time.jpg'
import family2 from '../data/images/intro/family_time2.jpg'
import travelling2 from '../data/images/intro/travelling2.jpg'
import travelling3 from '../data/images/intro/travelling3.jpg'
import mountains1 from '../data/images/intro/mountains1.jpg'
import mountains2 from '../data/images/intro/mountains2.jpg'
import snow1 from '../data/images/intro/snow1.jpg'
import snow2 from '../data/images/intro/snow2.jpg'
import goodTime1 from '../data/images/intro/good_time.jpg'
import goodTime2 from '../data/images/intro/good_time2.jpg'
//intro images portrait
import outdoors1Portrait from '../data/images/intro/portrait/outdoors1.jpg'
import outdoors2Portrait from '../data/images/intro/portrait/outdoors2.jpg'
import family1Portrait from '../data/images/intro/portrait/family1.jpg'
import family2Portrait from '../data/images/intro/portrait/family2.jpg'
import travelling1Portrait from '../data/images/intro/portrait/travelling1.jpg'
import travelling2Portrait from '../data/images/intro/portrait/travelling2.jpg'
import mountains1Portrait from '../data/images/intro/portrait/mountains1.jpg'
import mountains2Portrait from '../data/images/intro/portrait/mountains2.jpg'
import snow1Portrait from '../data/images/intro/portrait/snow1.jpg'
import snow2Portrait from '../data/images/intro/portrait/snow2.jpg'
import goodTime1Portrait from '../data/images/intro/portrait/fun1.jpg'
import goodTime2Portrait from '../data/images/intro/portrait/fun2.jpg'
//about images
import turoa from '../data/images/about/turoa.jpg'
import lesDeuxAlpes from '../data/images/about/lesDeuxAlpes.jpg'
import hillfoot from '../data/images/about/hillfoot.jpg'
import martray from '../data/images/about/martray.jpg'
import costa from '../data/images/about/costa.png'
import trading from '../data/images/about/Trading.jpg'
import vwo from '../data/images/about/vwo.jpg'
import build1 from '../data/images/about/build1.jpg'
//code images
import myApp from '../data/images/code/myApp.png'
import memory from '../data/images/code/memory.jpg'
import battleship from '../data/images/code/battleship.png'
import drump_machine from '../data/images/code/drump_machine.png'
import calculator from '../data/images/code/calculator.png'

const headerText = [
    {
        text1: 'I love',
        text2: 'Creating!'
    },
    {
        text1: 'I love',
        text2: 'Learning new things!'
    },
    {
        text1: 'I love',
        text2: 'making Bread!🥖' 
    },
    {
        text1: 'I love',
        text2: 'Solving problems!'
    },
    {
        text1: 'I love',
        text2: 'getting Feedback!'
    },
    {
        text1: 'Skill:',
        text2: 'Managing situations'
    },
    {
        text1: 'Skills:',
        text2: 'Being assertive'
    },
    {
        text1: 'Skills:',
        text2: 'Understanding people'
    },
    {
        text1: 'Skills:',
        text2: 'Business awareness'
    },
    {
        text1: 'Skills:',
        text2: 'Determination'
    },
    {
        text1: 'Skills:',
        text2: 'Motivating others'
    }
]

const lifeSkills = [
    "fluent in English, Dutch and German.",
    "Reasonable understanding of French",
    "Great people skills",
    "Good at seeing the bigger picture",
    "Self confident",
    "Very keen on learning new things",
    "Problem solver"
]

const code = [
    {
        img: myApp,
        appLink: "https://memorybp.herokuapp.com",
        title: "Personal app",
        text: "A full-stack app as a portfolio, but also as a way to express my journey so far. I am trying to apply everything I have learned so far, continiously improving little bits. For me personally a great way to learn.",
        codelink1: "https://github.com/Bponthemove/Memory",
        codelink1Text: "* My personal app, build using React, Express, Mongo and Node (dec 2021, jan 2022).",
        codelink2: "",
        codelink2Text: ""
    },
    {
        img: memory,
        appLink: "https://memorybp.herokuapp.com",
        title: "Memory",
        text: "One of the first things I build when I started learning Javascript. My kids always love playing it and I wanted to build something indepently, something that you don't do in all the courses. I rewrote it using React, when I started learning React and still update little bits when I learn new things.",
        codelink1: "https://github.com/Bponthemove/Memory",
        codelink1Text: "* Memory, rebuild using React (nov, 2021).",
        codelink2: "",
        codelink2Text: "* Memory, in plain js (june, 2021)."
    },
    {
        img: battleship,
        appLink: "https://battleshipbp.herokuapp.com",
        title: "Battleship",
        text: "Same as the memory, great to practice Javascript. Although I'm not into games or making games, these little projects are perfect for me to learn.",
        codelink1: "https://github.com/Bponthemove/Battleship",
        codelink1Text: "* Battleship, rebuild using React (nov, 2021).",
        codelink2: "",
        codelink2Text: "* Battleship, in plain js (june, 2021)."
    },
    {
        img: drump_machine,
        appLink: "https://drump-machine.herokuapp.com/",
        title: "Drump Machine",
        text: "One of the first things I build when I started learning React. It is a project for Free Code Camp, making a drum machine. Just altered the assignment a little to make it more fun",
        codelink1: "https://github.com/Bponthemove/Drump-machine",
        codelink1Text: "* Drump Machine, build with React (oct, 2021).",
        codelink2: "",
        codelink2Text: ""
    },
    {
        img: calculator,
        appLink: "https://calculatorfcc.herokuapp.com/",
        title: "Calculator",
        text: "One of the first things I build when I started learning React. Another project for Free Code Camp.",
        codelink1: "https://github.com/Bponthemove/calculator",
        codelink1Text: "* Calculator, build with React (oct, 2021).",
        codelink2: "",
        codelink2Text: ""
    }
]

const pastTrades = [    
    {   title: 'A levels and Bio Pharmaceutical Sciences',
        text: "In 1997 I finished VWO (equivalent to A-Levels) in the following subjects (Dutch, German, English, Maths, Science, Physics and Biology) and carried on to study Bio Pharmaceutical Sciences at the University of Leiden. I aborted this after two years, because of personal reasons. Whilst at university I worked as a shift manager in a large restaurant. When I aborted my degree I started working here full time, mainly to have some time to think about what to do next.",
        img1: vwo,
        img2: ""
    }, 
    {   title: 'Hospitality management and Setting up bars and restaurants at the Costa',
        text: "When I worked in this restaurant, the management team of the chain offered me the role as an assistant manager in a work/study role. I completed my Hospitality Management whilst working as an assistant manager in charge of around 45 staff. Due to changes at the directors level of this restaurant chain and following disagreements, I decided to give up this role and to travel around for some time. I ended up in Spain (2001) and coincidentally ended up at a restaurant who needed an assitant manager. I did that for a summer and than the owners offered me to set up a new site with them. This included a large seaside restaurant, a small nightclub and bar in town. I managed these sites very successfull for 5 years. I was in charge of about 60 staff in total and duties included everything from accounts to staff management to organising events and much more.",
        img1: "",
        img2: costa
    }, 
    {   title: 'Snowboard instructing and guiding',
        text: "I left Spain (2006) to have a bit more time for myself and ended up following my of my dreams. I have always loved nature, mountains and snow. After a season running a restaurant in Les Deux Alpes (France), I decided to get certified in ski and snowboard instructing and than got a job in Turoa, New Zealand. I spent a season in the snow, instructing and completing various courses in order to teach more advanced skiers/snowboarders. After that season I got a job in Konigsleiten (Austria), where I carried on working as an instructor/guide. This is where I met my wife, who was also working in this skischool. I have done this for 5 seasons in total.",
        img1: turoa,
        img2: lesDeuxAlpes
    }, 
    {   title: 'Farming',
        text: "My wife is a farmers daughter and in 2009 we spent 8 months together in New Zealand, working on various farms/smallholdings through a program called Helpx(work for food/accomodation). I got very interested in farming and especially sustainable beef farming. When we got the chance to manage a farm in France for a few years, I got more and more interested in this subject. The farm in France belonged to an old family friend, who was 'let down' by her previous manager and was hoping to sell the farm. This was during the financial crisis and we managed the farm for three years, whilst dealing with many potential buyers. After three years we succeeded in selling the farm. We moved to the UK (2012), to be closer to my wife's family. There I found a job as a herdsman on a grass fed beef farm, where I was managing a large herd which included anything to do with cows/calves, finishing cows, all the tractor work, etc. I worked here for 3.5 years, trying to get as much experience as possible to hopefully start for myself. I tried to obtain several farm tenancies, but all failed unfortunately. I was also hoping to take over the management of the farm where I was working, but that was not possible. As I am not a person who could be a farm worker for his entire life, I decided to stop working there.",
        img1: martray,
        img2: hillfoot
    }, 
    {   title: 'Building and Stock Trading',
        text: "After farming (2016) we decided to make the most of my wife's maternity leave and spent another winter in the snow, in Austria. I got more and more into stock trading, which had always been a hobby of mine. When we got back in the UK, I decided to carry on doing that. The only problem was that the more I did it, the more I disliked it. It is a lot of waiting for certain levels to be hit before doing anything and doing it full-time was getting a bit boring. So I started to help out an old friend who is a plumber/electrician, but carrying on trading on the side. I really enjoyed being creative and started doing projects for myself. Over the past few years I have done several bathrooms, kitchens, patios and driveways. I really enjoy the creative and problem solving side of it and I get to learn new skills on the job all the time.",
        img1: build1,
        img2: trading
    }                
]

const text = {
    intro: {
        h1: "Hi, I'm Bram",
        h3: "I am a self-taught hoping to be (one day) developer who is looking for a great place to develop and to be developed.",
        p: "Never too old to learn something new is definitely something that applies to me. Having done various things in various places in life, 2021 was the year I decided to have a go at web development. I am now looking for a role somewhere, where I can contribute and learn. Please have a look around and feel free to leave me a message, some advice or just some encouragement!"
    },
    about: {
        h1: "A bit of history",
        h3: `${pastTrades[0].title}, ${pastTrades[1].title}, ${pastTrades[2].title}, ${pastTrades[3].title}, ${pastTrades[4].title}.`,
        p: "These are the things that have kept me busy over the last 25 years. In addition to that I also have three young children who are full of life. I am someone who needs to be challenged, to be learning/trying new things in life all the time. Both on the professional and personal side of life."
    },
    skills: {
        h1: "Things I have learned so far",
        h3: "A quick overview of all the things that make me ME.",
        p: "At the moment I am learning to become more comfortable with the subjects that I have learned so far with the addition of TypeScript & JQuery. Personally I feel that it is better to learn the current subjects more in depth than trying to learn as many as possible, but only touching the surface."
    },
    code: {
        h1: "Home grown Code",
        h3: "A few projects I have done myself so far.",
        p: "I have linked some of the old orignal plain Javascript code as well, just to show where I am coming from. Obviously this website is part of it and I try to apply everything I'm learning at the moment to improve all of these. My preferred way of learning new things is to make plenty of mistakes and try to come up with a better solution. Any advice is greatly appreciated, either drop me a message or comment in the blog!"
    }
}

const hobby = [
    {   img1: travelling3,
        img2: travelling2,
        img3: travelling1Portrait,
        img4: travelling2Portrait,
        text: "travelling"
    },
    {   img1: family1,
        img2: family2,
        img3: family1Portrait,
        img4: family2Portrait,
        text: "family time"
    },
    {   img1: outdoors1,
        img2: outdoors2,
        img3: outdoors1Portrait,
        img4: outdoors2Portrait,
        text: "the outdoors"
    },
    {   img1: snow1,
        img2: snow2,
        img3: snow1Portrait,
        img4: snow2Portrait,
        text: "snow time"
    },
    {   img1: mountains1,
        img2: mountains2,
        img3: mountains1Portrait,
        img4: mountains2Portrait,
        text: "mountains"
    },
    {   img1: goodTime1,
        img2: goodTime2,
        img3: goodTime1Portrait,
        img4: goodTime2Portrait,
        text: "having fun"
    }
]

const blog = {
    h2: "Discovering the world of Mongo, Express, React and Node.",
    p: "This was my first independent project combining all of these and trying it out and I thought that I might as well use it to share my experiences of becoming a developer from scratch, zero, nada! All the projects I have done before have always been through courses I followed (Udemy, Scrimba, Youtube and FreeCodeCamp) and you just don't learn as much as when you build it completely yourself. It needs lots of improving, so any suggestions, comments are more than welcome!"
}

export { code, pastTrades, text, lifeSkills, hobby, blog, headerText }