// Interfaces for Categories
export interface CategoryItem {
    id: number,
    imageUrl: string,
    name: string,
    price: number
}

export interface CategoryObject {
    title: string,
    imageUrl: string,
    items: CategoryItem[]
}

export interface CategoriesState {
    categoryObjectsArray: CategoryObject[],
    isLoading: boolean
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
    currentUser: User | null
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
    cartItems: CartItem[]
}