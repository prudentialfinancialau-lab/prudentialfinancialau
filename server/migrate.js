import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, initializePages, closeDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateContentToMongoDB() {
  console.log('🔄 Starting content migration to MongoDB...\n');

  try {
    // Connect to MongoDB
    await connectDB();

    // Read all JSON content files
    const contentDir = path.join(__dirname, '../content');
    const pages = ['home', 'about', 'lenders', 'contact'];

    const pagesData = {};

    for (const pageSlug of pages) {
      const filePath = path.join(contentDir, pageSlug, 'index.json');

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const pageData = JSON.parse(fileContent);
        pagesData[pageSlug] = pageData;
        console.log(`✅ Loaded ${pageSlug} page content`);
      } catch (error) {
        console.error(`❌ Error reading ${pageSlug} page:`, error.message);
      }
    }

    // Initialize MongoDB with content
    await initializePages(pagesData);

    console.log('\n✅ Migration completed successfully!');
    console.log(`📊 Migrated ${Object.keys(pagesData).length} pages to MongoDB\n`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

// Run migration
migrateContentToMongoDB();
