import { neon } from '@neondatabase/serverless';

// Create a SQL query function
export const sql = neon(process.env.DATABASE_URL!);

// Helper to check if database is connected
export const isDatabaseConnected = () => !!process.env.DATABASE_URL;
