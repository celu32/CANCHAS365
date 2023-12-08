import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const AuthContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [favorites, setFavorites] = useState(null);

//console.log(favorites);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLogged(true);
    }
    const getFavorites = localStorage.getItem("favorites");
    if (getFavorites) {
      setFavorites(JSON.parse(getFavorites));
    }
  }, []);

  const saveData = (data) => {
    localStorage.setItem("user", JSON.stringify(data.usuario));
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("favorites", JSON.stringify(data.usuario.favorites));
    setUserData(data.usuario);
    setFavorites(data.usuario.favorites);
    setIsLogged(true);
  };

  const saveFavorites = (clubesFavoritos) => {
    const newFavorites = [...favorites, clubesFavoritos];
    setFavorites(newFavorites);
  };

  const updateFavorites = (clubResult) => {
    console.log(clubResult);
    if (!favorites.some((club) => club.id === clubResult.id)) {
      setFavorites([...favorites, clubResult]);
    } else {
      setFavorites(favorites.filter((club) => club.id != clubResult.id));
    }
    // localStorage.removeItem("favorites");
    // localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const contextValue = {
    userData,
    saveData,
    setUserData,
    isLogged,
    setIsLogged,
    favorites,
    saveFavorites,
    updateFavorites,
    setFavorites
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
