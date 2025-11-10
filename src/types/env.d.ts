interface ImportMetaEnv {
    // Firebase-related types for environment variables
    readonly VITE_FIREBASE_API_KEY: string,
    readonly VITE_FIREBASE_AUTH_DOMAIN: string,
    readonly VITE_FIREBASE_PROJECT_ID: string,
    readonly VITE_FIREBASE_STORAGE_BUCKET: string,
    readonly VITE_FIREBASE_MESSAGING_SENDING_ID: string,
    readonly VITE_FIREBASE_APP_ID: string,
    
    // Dev mode or production mode types for environment variables
    readonly DEV: boolean,
    readonly PROD: boolean,
    readonly MODE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}