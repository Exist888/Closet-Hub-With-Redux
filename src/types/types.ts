// Interfaces for Categories
export interface CategoryItem {
    id: number,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number
}

export interface CategoryObject {
    title: string,
    imageUrl: string,
    items: CategoryItem[]
}

// For categoriesSelector
export interface CategoryMap {
    // Index signature: keys are category titles (strings), values are arrays of CategoryItem
    [key: string]: CategoryItem[]
}

export interface CategoriesState {
    readonly categoryObjectsArray: CategoryObject[],
    readonly isLoading: boolean
}


// Interfaces for User
export interface User {
    // Do not include password - we pass this into our firebase function at the component level
    email: string,
    // Make displayName optional to handle sign in component without name
    displayName?: string
}

export interface UserState {
    // Union with null option is standard for auth state - representing no user signed in
    readonly currentUser: User | null
}


// Interfaces for Cart
export interface CartItem {
    id: number,
    name: string,
    imageUrl: string,
    price: number,
    quantity: number
}

export interface CartState {
    readonly cartItems: CartItem[]
}