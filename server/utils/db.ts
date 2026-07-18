import { neon } from '@neondatabase/serverless'
import { defaultItems } from './contentStore'

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

    // Create content_items table for Stories, Programs, and News
    await sql`
      CREATE TABLE IF NOT EXISTS content_items (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        quote TEXT,
        content TEXT,
        media_url TEXT,
        media_type TEXT DEFAULT 'image',
        accent TEXT DEFAULT 'teal',
        category TEXT,
        author TEXT,
        date TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    // Create media_files table for uploaded story images/videos
    await sql`
      CREATE TABLE IF NOT EXISTS media_files (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        content_type TEXT NOT NULL,
        size_bytes BIGINT NOT NULL,
        data_base64 TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    // Create app_seed_tracker table and seed initial stories only once
    await sql`
      CREATE TABLE IF NOT EXISTS app_seed_tracker (
        seed_key TEXT PRIMARY KEY,
        seeded_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
    const seedCheck = await sql`SELECT seed_key FROM app_seed_tracker WHERE seed_key = 'initial_stories_v1';`
    if (!seedCheck || seedCheck.length === 0) {
      console.log('[DB] Seeding initial stories into content_items table for the first time...')
      for (const item of defaultItems) {
        await sql`
          INSERT INTO content_items (id, type, title, subtitle, quote, content, media_url, media_type, accent, category, author, date, created_at)
          VALUES (${item.id}, ${item.type}, ${item.title}, ${item.subtitle || null}, ${item.quote || null}, ${item.content || null}, ${item.mediaUrl || null}, ${item.mediaType || 'image'}, ${item.accent || 'teal'}, ${item.category || null}, ${item.author || null}, ${item.date || null}, ${item.createdAt || new Date().toISOString()})
          ON CONFLICT (id) DO NOTHING;
        `
      }
      await sql`INSERT INTO app_seed_tracker (seed_key) VALUES ('initial_stories_v1') ON CONFLICT (seed_key) DO NOTHING;`
    }

    console.log('[DB] Database tables initialized successfully.')
  } catch (error) {
    console.error('[DB] Error initializing database tables:', error)
  }
}
