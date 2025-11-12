import { categoriesReducer, initialState, setIsLoading, setCategories } from "./categoriesSlice";

describe("categoriesSlice action tests", () => {
    test("setIsLoading", () => {
        const expectedState = {
            // Spread syntax keeps all state props except for changed property (isLoading) for testing
            ...initialState,
            isLoading: true
        }

        const testedState = categoriesReducer(initialState, setIsLoading(true));
        expect(testedState).toEqual(expectedState);
    });

    test("setCategories", () => {
        const mockData = [
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
        ];

        const expectedState = {
            ...initialState,
            isLoading: false,
            categoryObjectsArray: mockData
        }

        const testedState = categoriesReducer(initialState, setCategories(mockData));
        expect(testedState).toEqual(expectedState);
    });
});