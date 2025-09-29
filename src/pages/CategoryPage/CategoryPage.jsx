import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categoriesSelector.js";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import "./CategoryPage.scss";

export function CategoryPage() {
    // Destructure category from current url param object - same variable name assigned in shop route
    const { category } = useParams();

    // Get current categories map state from Redux store
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

    // Create an array of keys from the categories object so we can map
    const categoryKeys = Object.keys(categoriesMap);
    // Ensure url param matches a real category key before rendering text
    const categoryText = categoryKeys.includes(category) && `All ${category}`;

    return (
        categoryText && (
            <section className="shop-section elements-container">
                <div className="page-title-container category-page-title-container">
                    <h1>{categoryText}</h1>
                </div>
                <div className="category-container">
                    {categoryProductsJsx && categoryProductsJsx}
                </div>
            </section>
        )
    );
}