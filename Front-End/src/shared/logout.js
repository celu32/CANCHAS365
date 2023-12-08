
export const logout = ({setUserData, setIsLogged, setFavorites }) => {
    setUserData(null);
    setIsLogged(false);
    setFavorites(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
}
