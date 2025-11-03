import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    writeBatch, 
    query,
    getDocs,
} from "firebase/firestore";
// For TS: Firebase's built-in types - User (including uid), NextOrObserver, & DocumentReference
import type { User as FirebaseUser, NextOrObserver, UserCredential } from "firebase/auth";
import type { DocumentReference } from "firebase/firestore";
import type { CategoryObject } from "../../types/types";

// Initialize Firebase app with .env variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDING_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase app with the config object
const firebaseApp = initializeApp(firebaseConfig);

// Create an instance of Google auth provider
const provider = new GoogleAuthProvider();

// Force user to select account every time - even if already signed in
provider.setCustomParameters({
    prompt: "select_account"
});

// Initialize Firebase Auth and export a function to sign in with Google popup
export const auth = getAuth();
export function signInWithGooglePopup() {
    return signInWithPopup(auth, provider);
}

// Initialize Firestore database
export const db = getFirestore();

// For TS: define shape of ObjectToAdd type
interface ObjectToAdd {
    title: string
}

// Add multiple docs to a collection in Firestore
// For TS: pass in generic type that extends ObjectToAdd - ensures any T will have at least a title prop
export async function addCollectionAndDocuments<T extends ObjectToAdd>(
    collectionKey: string, objectsToAdd: T[]
// Function returns async Promise type with its own void return type
): Promise<void> {
    // Create a reference to our collection using db as location and collectionKey as its name
    const collectionRef = collection(db, collectionKey);
    // Create a batch so we can achieve multiple writes in one unit
    const batch = writeBatch(db);
    // Iterate through all data objects  
    objectsToAdd.forEach((object) => {
        // Create a reference to our doc using collectionRef as location and object.title as its doc id
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // Set each doc reference and object into our batch before committing the batch as a whole
        batch.set(docRef, object);
    });
    // Execute all the batched operations
    await batch.commit();
}

// For TS: function returns async Promise of type CategoryObject array
export async function getCategoriesAndDocuments(): Promise<CategoryObject[]> {
    // Get a reference to our "categories" collection in Firestore
    const collectionRef = collection(db, "categories");
    // Build an unfiltered query to our collectionRef
    const q = query(collectionRef);
    // Fetch all documents from the collection
    const querySnapshot = await getDocs(q);
    // Get raw document snapshots from the query (as an array)
    const docSnapshots = querySnapshot.docs;

    // FOR REDUX: Return an array of plain JS objects extracted from document snapshots
    const categoryObjectsArray = docSnapshots.map((docSnapshot) => {
        // For TS: ensure each snapshot is of type CategoryObject
        return docSnapshot.data() as CategoryObject;
    });

    return categoryObjectsArray;
}

// Create a user document in Firestore from authenticated user data
// Include additionalInfo as optional param to overwrite nullified displayName (for em and pw auth)
export async function createUserDocumentFromAuth(
    // For TS: assign userAuth to default Firebase User object type so TS can infer uid type
    // For TS: If additional info includes displayName, assign to type string
    userAuth: FirebaseUser, additionalInfo: { displayName?: string } = {}
): Promise<DocumentReference | void> {
    if (!userAuth) return;

    // Create reference to user object in "users" collection with uid as id
    const userDocRef = doc(db, "users", userAuth.uid);

    // Retrieve the document snapshot - not the document itself
    const userSnapshot = await getDoc(userDocRef);

    // Create a user document if it doesn't already exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // Create (set) the user document with basic user info
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.error("Error creating the user.");
        }
    }

    // Return the reference to the user doc whether it exists or not
    return userDocRef;
}

// For TS: assign types to parameters in next two functions
export async function createAuthUserWithEmailAndPassword(
    email: string, password: string
): Promise<UserCredential | void> {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInUserWithEmailAndPassword(email: string, password:string) {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
    await signOut(auth);
}

// For TS: assign TS union type to callback to allow for next (with user) or observer (for complete or error)
export function onAuthStateChangedListener(callback: NextOrObserver<FirebaseUser>) {
    onAuthStateChanged(auth, callback);
}