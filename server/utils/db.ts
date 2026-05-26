import { neon } from '@neondatabase/serverless'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.warn('[DB] DATABASE_URL is not set in environment variables. Database integration will be disabled.')
}

export const sql = databaseUrl ? neon(databaseUrl) : null

export async function initDb() {
  if (!sql) {
    console.warn('[DB] SQL client is not initialized because DATABASE_URL is missing.')
    return
  }

  try {
    console.log('[DB] Ensuring tables exist in Neon PostgreSQL...')
    
    // Create volunteers table
    await sql`
      CREATE TABLE IF NOT EXISTS volunteers (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        location TEXT,
        interests TEXT[],
        availability TEXT,
        experience TEXT,
        message TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    // Create donations table
    await sql`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        amount NUMERIC NOT NULL,
        currency TEXT NOT NULL DEFAULT 'NGN',
        converted_amount_ngn NUMERIC,
        proof_filename TEXT NOT NULL,
        proof_content_type TEXT,
        proof_data TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    // Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
    console.log('[DB] Database tables initialized successfully.')
  } catch (error) {
    console.error('[DB] Error initializing database tables:', error)
  }
}
