import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";
import useFetchDataApi from "../../../hooks/useFetchDataApi";
import { validationSchemaUserSignIn as validationSchema } from "../../../validations/ValidationSchemaUserSignIn";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { ENDPOINTS } from "../../../constants/endpoints";
import { METHODS } from "../../../constants/methods";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../../auth/context";
import { Typography} from "@mui/material"

const FormUserSignIn = () => {
  const { data, isLoading, error, fetchData } = useFetchDataApi();

  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      fetchData(ENDPOINTS.USER_SIGN_IN, METHODS.POST, values);
    },
  });

  const { saveData } = AuthContext();
  const navigate = useNavigate();

  const location = useLocation();
  const fromReserveButton = location.state?.fromReserveButton;

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Los datos ingresados son incorrectos",
        icon: "error",
      });
      formik.resetForm();
    }
    if (data) {
      saveData(data);
      Swal.fire({
        title: "Bienvenido/a!",
        icon: "success",
      });
      if (data.usuario.rol[0].name.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [data, error]);

  return (
    <Container maxWidth="md">

      <Typography variant="h3" component="h3" 
        sx={{
            padding: {sm:'50px', xs:'10px'},
            margin:'auto',
            color: '#1F2E7B',
            fontSize:'30px', 
            fontWeight:'bolder'
        }}>
            Iniciar sesión
        </Typography>

      {fromReserveButton && <h5 style={{ color: "#FF914D"}}>Para realizar una reserva por favor iniciá sesión</h5>}

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={formik.handleSubmit} className={`${styles.form}`}>
          <TextField
            variant="outlined"
            size="small"
            label="Username (email)"
            type="email"
            name="username"
            className="input-background"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <span style={{ color: "red" }}>{formik.errors.username}</span>
          )}
          <TextField
            variant="outlined"
            size="small"
            label="Contraseña"
            type="password"
            name="password"
            className="input-background"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <span style={{ color: "red" }}>{formik.errors.password}</span>
          )}

          <Button variant="contained" type="submit">
            Iniciar sesión
          </Button>
          <h5 style={{ color: "#1F2E7B" }}>¿Aún no tenés una cuenta? <Link to='/signup' style={{ color: "#FF914D" }} >Registrate</Link></h5>
        </form>
      )}
    </Container>
  );
};

export default FormUserSignIn;
