import { Routes, Route } from "react-router-dom";
import { ShopPage } from "../../pages/ShopPage/ShopPage";
import { CategoryPage } from "../../pages/CategoryPage/CategoryPage";
import "./Shop.scss";

export default function Shop() {
    return (
        <Routes>
            <Route index element={<ShopPage />} />
            <Route path=":category" element={<CategoryPage />} />
        </Routes>
    );
}