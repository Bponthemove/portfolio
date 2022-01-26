import Home from "./pages/Home";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import Missing from "./pages/Missing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom' 
import { DataProvider } from "./context/DataContext";

function App() {

  return (
      <div className="app">
        <DataProvider>
          <Header/>
          <Nav />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/blog' element={ <Blog/> } />
            <Route path='/blog/newpost' element={ <NewPost /> } />
            <Route path='/blog/post/:id' element={ <PostPage /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='*' element={ <Missing /> } />
          </Routes>
          <Footer />
        </DataProvider>
      </div>
  )
}

export default App;
