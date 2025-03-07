import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
	Auth,
	GoogleAuthProvider,
	UserCredential,
	getAuth,
	signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAO9babt5e3wd9GuH0G3S12wZcAL1tXB0Q",
	authDomain: "profilehub-b3d51.firebaseapp.com",
	projectId: "profilehub-b3d51",
	storageBucket: "profilehub-b3d51.firebasestorage.app", // ✅ Corrección en storageBucket
	messagingSenderId: "635559310331",
	appId: "1:635559310331:web:e7eafe618c792d973f515e",
	measurementId: "G-N1NPQP4X1L",
};

// Inicializar Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
	try {
		const result: UserCredential = await signInWithPopup(auth, googleProvider);
		const user = result.user;
		return user;
	} catch (error) {
		console.error("Error al iniciar sesion con Google", error);
		return null;
	}
};
