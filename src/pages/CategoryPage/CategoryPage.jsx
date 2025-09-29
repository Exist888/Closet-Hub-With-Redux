import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { CategoriesContext } from "../../contexts/CategoriesContext.jsx";
import { selectCategoriesMap } from "../../store/categories/categoriesSelector.js";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import "./CategoryPage.scss";

export function CategoryPage() {
    // Destructure category from the current url param object
    const { category } = useParams();
    // Destructure the categoriesMap object from context (top-level keys match our category params)
    // const { categoriesMap } = useContext(CategoriesContext);

    // For Redux refactor, replace categoriers context with useSelector
    const categoriesMap = useSelector(selectCategoriesMap);

    // Find the values in categoriesMap that are nested in the key that matches our current category param
    // Assign these values to the initial products state
    const [products, setProducts] = useState(categoriesMap[category]);

    // Set products state when category param or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    // If products do not exist yet, map over an empty array to avoid errors
    const productsArray = products || [];

    const categoryProductsJsx = productsArray.map((product) => {
        return (
            <ProductCard key={product.id} product={product}/>
        );
    });

    return (
        <section className="shop-section elements-container">
            <div className="page-title-container category-page-title-container">
                <h1>All {category}</h1>
            </div>
            <div className="category-container">
                {categoryProductsJsx && categoryProductsJsx}
            </div>
        </section>
    );
}