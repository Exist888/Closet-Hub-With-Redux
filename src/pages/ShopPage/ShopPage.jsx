import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { CategoriesContext } from "../../contexts/CategoriesContext.jsx";
import { selectCategoriesMap } from "../../store/categories/categoriesSelector.js";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import "./ShopPage.scss";

export function ShopPage() {
    // Destructure shop categories object from context
    // const { categoriesMap } = useContext(CategoriesContext);

    // For Redux refactor, replace categoriers context with useSelector
    const categoriesMap = useSelector(selectCategoriesMap);

    // Create an array of keys from the categories object so we can map
    const categoryKeys = Object.keys(categoriesMap);

    // Map through the array of title keys in the category object
    const categoriesAndProductsJsx = categoryKeys.map((title) => {
        // Find the first four products inside of each title
        const categoryPreviewsArr = categoriesMap[title].slice(0, 4);

        // Map through the products in each title and pass values into the Product Card component
        const categoryProductsJsx = categoryPreviewsArr.map((product) => {
            return (
                <ProductCard key={product.id} product={product}/>
            );
        });

        // Return jsx for each category including the Product Card components
        return (
            <div key={title}>
                <Link className="category-link" to={title}>
                    <div className="category-title-container">
                        <div className="title-decoration"></div>
                        <h2 className="category-title">Shop {title}</h2>
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </Link>
                <div className="category-container">
                    {categoryProductsJsx}
                </div>
            </div>
        );
    });

    return (
        <section className="shop-section elements-container">
            <div className="page-title-container">
                <h1>Browse Collections</h1>
            </div>
            {categoriesAndProductsJsx}
        </section>
    );
}