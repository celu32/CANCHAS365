import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import User from "../pages/user/User";
import Header from "../components/ui/header/Header";
import Home from "../pages/home/Home";
import Footer from "../components/ui/footer/Footer";
import Detail from "../pages/product/Detail";
import NotFound from "../pages/notFound/NotFound";
import Playfields from "../pages/admin/Playfields";
import UserSignIn from "../pages/user/UserSignIn";
import UserProfile from "../pages/user/UserProfile";
import { AdminRoute } from "./AdminRoute";
import { UserRoute } from "./UserRoute";
import Filter from '../pages/product/Filter';
import ClubSearch from "../pages/clubSearch/ClubSearch";
import Reservations from "../pages/reservations/Reservations";


export const Navigation = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/club/:id" element={<Detail />} />

        <Route exact path="/category/:id" element={<Filter />} />

        <Route exact path="/club/search" element={<ClubSearch />} />

        <Route exact path="/reservations" element={<Reservations />} />

        <Route
          exact
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          exact
          path="/admin/club/:id"
          element={
            <AdminRoute>
              <Playfields />
            </AdminRoute>
          }
        />

        <Route exact path="/signup" element={<User />} />

        <Route exact path="/signin" element={<UserSignIn />} />

        <Route
          exact
          path="/userprofile"
          element={
            <UserRoute>
              <UserProfile />
            </UserRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
