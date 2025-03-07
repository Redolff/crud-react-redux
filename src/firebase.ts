import { FirebaseApp, initializeApp } from "firebase/app";
import {
	Auth,
	GoogleAuthProvider,
	UserCredential,
	getAuth,
	signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY_GOOGLE,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN_GOOGLE,
	projectId: import.meta.env.VITE_PROJECT_ID_GOOGLE,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET_GOOGLE, // ✅ Corrección en storageBucket
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_GOOGLE,
	appId: import.meta.env.VITE_APP_ID_GOOGLE,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID_GOOGLE,
};

// Inicializar Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
	try {
		const result: UserCredential = await signInWithPopup(auth, googleProvider);
		return result;
	} catch (error) {
		console.error("Error al iniciar sesion con Google", error);
		return null;
	}
};
