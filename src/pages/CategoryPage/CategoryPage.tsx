import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectIsLoading } from "../../store/categories/categoriesSelector";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Spinner } from "../../components/Spinner/Spinner";
import type { CategoryItem } from "../../types/types"; // FOR TS: to specify type of products array
import "./CategoryPage.scss";

// FOR TS: Define the shape of expected route params for this page (e.g. "/shop/:category")
type CategoryRouteParams = {
    category: string
}

export function CategoryPage() {
    const [products, setProducts] = useState<CategoryItem[]>([]);

    // Destructure category from current url param object - same variable name assigned in shop route
    // FOR TS: Pass custom type into params and assert type (params will always be string)
    const { category } = useParams<CategoryRouteParams>() as CategoryRouteParams;

    // Get the transformed categories object (keyed by category title) from Redux store via selector
    const categoriesObject = useSelector(selectCategoriesMap);
    // Capture isLoading state from Redux
    const isLoading = useSelector(selectIsLoading);

    // Set products state when category param or categoriesObject changes
    useEffect(() => {
        // Use dynamic key to lookup products that match title in param and assign to products state
        // FOR TS: Ensure products start as empty CategoryItem array instead of undefined
        setProducts(categoriesObject[category] ?? []);
    }, [category, categoriesObject]);

    // If products do not exist yet, map over an empty array to avoid errors
    const productsArray = products || [];

    const categoryProductsJsx = productsArray.map((product) => {
        return (
            <ProductCard key={product.id} product={product}/>
        );
    });

    // Get category titles (keys) from the categories object for display
    const categoryKeys = Object.keys(categoriesObject);
    // Ensure url param matches a real category key before rendering text
    const categoryText = categoryKeys.includes(category) && `All ${category}`;

    return (
        categoryText && (
            <section className="shop-section elements-container">
                <div className="page-title-container category-page-title-container">
                    <h1>{categoryText}</h1>
                </div>
                <div className="category-container">
                    {isLoading? <Spinner /> : categoryProductsJsx}
                </div>
            </section>
        )
    );
}