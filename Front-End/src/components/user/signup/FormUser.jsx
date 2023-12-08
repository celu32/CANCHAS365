import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Container, TextField } from "@mui/material";
import styles from "./styles.module.css";
import { validationSchemaUser as validationSchema } from "../../../validations/ValidationSchemaUser";
import Swal from "sweetalert2";
import useFetchDataApi from "../../../hooks/useFetchDataApi";
import { ENDPOINTS } from "../../../constants/endpoints";
import { METHODS } from "../../../constants/methods";
import Loading from "../../loading/Loading";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const FormUser = () => {
  const { data, isLoading, error, fetchData } = useFetchDataApi();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    name: "",
    lastname: "",
    password: "",
    roles: ["USER"],
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Falló la creación por que el usuario ya existe",
        icon: "error",
      });
    }
    if (data) {
      console.log(data);
      Swal.fire({
        title: "Cuenta creada exitosamente",
        text: "Te enviamos la confirmación por correo, antes de cerrar esta ventana, revisá tu bandeja de entrada. Si no lo recibiste, hace click en el botón reenviar correo de confirmación.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Reenviar correo de confirmación",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          (async () => {
            try {
              const values = {
                toUser: data.username,
                subject: "Confirmación de creación de cuenta - Segundo envío",
                message: `Hola ${data.name} ${data.lastname}! Tu cuenta ha sido creada exitosamente y asociada al correo electrónico ${data.username}. Para iniciar sesión por favor hacé click en el siguiente enlace: http://localhost:5173/`,
              };
              await fetchData(ENDPOINTS.EMAIL_CONFIRM, METHODS.POST, values);
              
              Swal.fire({
                title: "Correo de confirmación enviado",
                text: "Hemos enviado nuevamente el correo de confirmación.",
                icon: "info",
              });
            } catch (error) {
              console.error("Error al enviar el correo de confirmación:", error);
              throw error;
            }
          })();
        }
      });
    }
  }, [data, error]);

  return (
    <Container maxWidth="md">
      <div>
        <h1>Crear Usuario</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) =>
              await fetchData(ENDPOINTS.USER_CREATE, METHODS.POST, values)
            }
          >
            {() => (
              <Form className={`${styles.form}`}>
                <div>
                  <Field name="username">
                    {({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          label="Username (email)"
                          fullWidth
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <div>
                  <Field name="name">
                    {({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          label="Nombre"
                          fullWidth
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <div>
                  <Field name="lastname">
                    {({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          label="Apellido"
                          fullWidth
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <div>
                  <Field name="password">
                    {({ field }) => (
                      <div>
                        <TextField
                          {...field}
                          variant="outlined"
                          size="small"
                          label="Contraseña"
                          type="password"
                          fullWidth
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    )}
                  </Field>
                </div>

                <Button variant="contained" type="submit">
                  Registrarse
                </Button>
                <h5 style={{ color: "#1F2E7B" }}>¿Ya tenés una cuenta? <Link to='/signin' style={{ color: "#FF914D" }} >Iniciar sesión</Link></h5>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Container>
  );
};

export default FormUser;
