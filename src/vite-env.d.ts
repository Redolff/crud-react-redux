/// <reference types="vite/client" />

declare namespace NodeJS {
	export interface ProcessEnv {
		API_KEY_GOOGLE: string;
		AUTH_DOMAIN_GOOGLE: string;
		PROJECT_ID_GOOGLE: string;
		STORAGE_BUCKET_GOOGLE: string;
		MESSAGING_SENDER_ID_GOOGLE: string;
		APP_ID_GOOGLE: string;
		MEASUREMENT_ID_GOOGLE: string;
	}
}
