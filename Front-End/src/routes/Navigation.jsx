import { Route, Routes } from "react-router-dom"
import Admin from "../pages/admin/Admin"
import Header from "../components/ui/header/Header"
import Home from "../pages/home/Home"
import Footer from "../components/ui/footer/Footer"
import Detail from "../pages/product/Detail"

export const Navigation = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path='/:id' element={<Detail/>}/>
                <Route exact path="/admin" element={<Admin/>}/>
                <Route path="*" element={<h1>NOT FOUND</h1>}/>
            </Routes>
            <Footer />
        </>
    )
}
