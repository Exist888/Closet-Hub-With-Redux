import { 
    selectCategoryObjectsArray, 
    selectCategoriesMap, 
    selectIsLoading 
} from "./categoriesSelector";
import type { RootState } from "../store";

// Must include shape of RootState with type assertion as selector expects RootState
const mockState = {
    user: {},
    cart: {},
    categories: {
        isLoading: false,
        categoryObjectsArray: [
            {
                title: "mens",
                imageUrl: "test",
                items: [
                    { id: 1, name: "Product 1", imageUrl: "test", price: 10, quantity: 1 },
                    { id: 2, name: "Product 2", imageUrl: "test", price: 10, quantity: 1 }
                ]
            },
            {
                title: "womens",
                imageUrl: "test",
                items: [
                    { id: 3, name: "Product 3", imageUrl: "test", price: 10, quantity: 1 },
                    { id: 4, name: "Product 4", imageUrl: "test", price: 10, quantity: 1 }
                ]
            }
        ]
    }
} as RootState;

describe("categoriesSelector tests", () => {
    test("selectCategoryObjectsArray should return the categories data", () => {
        const categoriesTestSlice = selectCategoryObjectsArray(mockState);
        expect(categoriesTestSlice).toEqual(mockState.categories.categoryObjectsArray);
    });

    test("selectIsLoading should return the isLoading state", () => {
        const isLoading = selectIsLoading(mockState);
        expect(isLoading).toEqual(false);
    });

    test("selectCategoriesMap should convert categoryObjectsArray into the expected map", () => {
        const expectedCategoriesMap = {
            mens: [
                { id: 1, name: "Product 1", imageUrl: "test", price: 10, quantity: 1 },
                { id: 2, name: "Product 2", imageUrl: "test", price: 10, quantity: 1 }
            ],
            womens: [
                { id: 3, name: "Product 3", imageUrl: "test", price: 10, quantity: 1 },
                { id: 4, name: "Product 4", imageUrl: "test", price: 10, quantity: 1 }
            ]
        };
        const testedCategoriesMap = selectCategoriesMap(mockState);
        expect(testedCategoriesMap).toEqual(expectedCategoriesMap);
    });
});