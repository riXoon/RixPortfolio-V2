import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { 
    PORT,
    NODE_ENV,
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    CORS_ORIGINS
} = process.env;

// fail at startup with a clear message instead of on the first login
if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in your environment variables')
}
