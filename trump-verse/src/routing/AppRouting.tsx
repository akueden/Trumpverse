import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage, RegisterPage, UpdateDeletePage, SearchPage} from '../pages';
import MainNavigation from "../components/shared/MainNavigation";

const AppRouting = () => {
    return (
        <>
            <BrowserRouter>
                <MainNavigation/>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="register" element={<RegisterPage/>}></Route>
                    <Route path="update-delete" element={<UpdateDeletePage/>}></Route>
                    <Route path="search" element={<SearchPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouting;