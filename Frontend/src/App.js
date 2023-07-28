import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import MyContext from './my_context';

import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import UserViewBuyer from './views/UserViewBuyer';


import Home from './views/Home';
import Carrito from './views/Carrito';
import Artwork from './views/Artwork';
import NotFound from "./views/NotFound.jsx";
import Registro from "./views/Registro.jsx";
import Login from "./views/Login.jsx";
import Favoritos from "./views/Favoritos";

import Busqueda from './views/Busqueda';

/* import UserCard from './components/UserCard'; */



import DetailArtist from './views/DetailArtist';


function App() {
  const endpoint = "/database.json";
  const endpointArtists = "/artistsDB.json";
  const [artworks, setArtworks] = useState([]);
  const [navTotal, setNavTotal] = useState(0); 
  const [artistsInfo, setArtistsInfo] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    dataArtworks();
    dataArtists();
  }, [])

  const dataArtworks = async () => {
    const responseData = await fetch(endpoint);
    const dataArtworks = await responseData.json();
    dataArtworks.artworks.map(element => element.amount = 0);
    dataArtworks.artworks.map(element => element.liked = false);
    setArtworks([...dataArtworks.artworks]);
  };

  const dataArtists = async () => {
    const responseData = await fetch(endpointArtists);
    const data = await responseData.json();
    data.artists.map(element => element.favorites = []);
    setArtistsInfo([...data.artists]);
  };

  const updatingNavTotal = () => {
    //CALCULA EL VALOR TOTAL DEL CARRITO
    let total = 0;
        artworks.forEach((element) => {
            total += element.price * element.amount;
        });
    return total
  };

  const estadoCompartido = {artworks, setArtworks, navTotal, setNavTotal, updatingNavTotal, artistsInfo, setArtistsInfo, isLoggedIn, setIsLoggedIn, user, setUser};

  return (
    
    <MyContext.Provider value={estadoCompartido}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/> 
          <Route path='/carrito' element={<Carrito />}/>
          <Route path='/busqueda' element={<Busqueda />}/> 
          <Route path='/favoritos' element={<Favoritos />}/> 
          <Route path='/artwork/:id' element={<Artwork />}/> 
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={UserViewBuyer} />
          <Route path="*" element={<NotFound />} />


          <Route path='/artist/:id' element={<DetailArtist />} />

        </Routes>
        <Footer />                  
      </BrowserRouter>  
    </MyContext.Provider>      
  );
}

export default App;