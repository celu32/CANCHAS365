import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { METHODS } from "../../constants/methods";
import useFetchDataApi from "../../hooks/useFetchDataApi";
import { AuthContext } from "../../auth/context";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";

const FavoriteButton = ({ clubId }) => {
  
  const { pathname } = useLocation();

  const [isFav, setIsFav] = useState(pathname === "/userprofile");

  const { userData, favorites, updateFavorites } = AuthContext();

  const { fetchData } = useFetchDataApi();

  const navigate = useNavigate();

  const clubResult = useFetchApi(`${ENDPOINTS.CLUB}/${clubId}`);

  //Aca busco en el contexto si existe el clubId que estoy pasando como props
  useEffect(() => {
    console.log("Actualizando favoritos");
    if (favorites?.find((club) => club.id === clubId)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [favorites]);

  const handleToggleFavorito = async () => {
    try {
      if (!clubResult) {
        console.warn("Datos del club no disponibles");
        return;
      }

      //Chequeo que el user este logueado
      if (!localStorage.getItem("user")) {
        Swal.fire({
          title: "Para modificar tus favoritos por favor iniciá sesión",
          icon: "error",
        }).then(() => {
          navigate("/signin");
        });
      }

      setIsFav(!isFav);
      //A continuacion, ademas del POST hay que agregar o quitar el favorito al/del context
      updateFavorites(clubResult.data);

      //Traigo del contexto el id del usuario para pasar al POST
      const userId = userData.id;

      //Hago el POST a la base de datos
      await fetchData(
        `${ENDPOINTS.USER}/${userId}/${ENDPOINTS.FAVORITES}`,
        METHODS.POST,
        clubResult.data
      );
      //console.log(clubResult.data);

    } catch (error) {
      console.error("Error al manejar favoritos:", error);
    }
  };

  return (
    <IconButton
      variant="plain"
      sx={{
        "--IconButton-size": "45px",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      onClick={handleToggleFavorito}
    >
      <span style={{ padding: "12px", display: "inline-block" }}>
        {isFav ? (
          <FavoriteIcon
            style={{ fontSize: "24px", color: "FF914D" }}
            variant="solid"
          />
        ) : (
          <FavoriteBorderIcon style={{ fontSize: "24px" }} variant="outlined" />
        )}
      </span>
    </IconButton>
  );
};

export default FavoriteButton;
