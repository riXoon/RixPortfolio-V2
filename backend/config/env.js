import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { 
    PORT,
    NODE_ENV,
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;