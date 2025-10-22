import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'prudential_financial';

let client = null;
let db = null;

export async function connectDB() {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function getDB() {
  if (!db) {
    return await connectDB();
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

// Page content operations
export async function getPageContent(pageSlug) {
  const database = await getDB();
  const collection = database.collection('pages');

  const page = await collection.findOne({ slug: pageSlug });

  if (!page) {
    return null;
  }

  // Return content without MongoDB _id
  const { _id, ...content } = page;
  return content;
}

export async function updatePageContent(pageSlug, content) {
  const database = await getDB();
  const collection = database.collection('pages');

  const result = await collection.updateOne(
    { slug: pageSlug },
    {
      $set: {
        ...content,
        slug: pageSlug,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );

  return result;
}

export async function initializePages(pagesData) {
  const database = await getDB();
  const collection = database.collection('pages');

  // Check if pages already exist
  const existingCount = await collection.countDocuments();

  if (existingCount > 0) {
    console.log(`ℹ️  Database already has ${existingCount} pages`);
    return;
  }

  // Insert initial pages
  const pages = Object.entries(pagesData).map(([slug, content]) => ({
    slug,
    ...content,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  await collection.insertMany(pages);
  console.log(`✅ Initialized ${pages.length} pages in database`);
}
