export function selectCategories(state) {
    const categoriesArray = state.categories.categoryObjectsArray;

    // Transform the categories array into an object keyed by lowercase category title for quick lookup
    const updatedCategoriesObj = categoriesArray.reduce((acc, category) => {
        // Destructure title and items from the document data
        const { title, items } = category;
        // Insert lowercase title as key in accumulator object and assign items array as value
        acc[title.toLowerCase()] = items;
        // Return the updated accumulator object
        return acc;
    }, {});

    return updatedCategoriesObj;
}