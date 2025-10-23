import 'dotenv/config'
import { MongoClient } from 'mongodb'
import payload from 'payload'

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = 'prudential_financial'

async function migrate() {
  console.log('🚀 Starting migration from TinaCMS to Payload CMS...\n')

  // Connect to MongoDB directly
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db(DB_NAME)
  const pagesCollection = db.collection('pages')

  // Initialize Payload (but don't start the server)
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  })

  try {
    // Fetch all pages from the old structure
    const pages = await pagesCollection.find({}).toArray()
    console.log(`📄 Found ${pages.length} pages to migrate\n`)

    const slugMap = {
      'home': 'home-page',
      'about': 'about-page',
      'lenders': 'lenders-page',
      'contact': 'contact-page',
    }

    for (const page of pages) {
      const { _id, slug, createdAt, updatedAt, ...content } = page
      const payloadSlug = slugMap[slug]

      if (!payloadSlug) {
        console.log(`⚠️  Skipping unknown page: ${slug}`)
        continue
      }

      console.log(`📝 Migrating ${slug} page...`)

      // Check if page already exists in Payload
      const existing = await payload.find({
        collection: payloadSlug,
        where: {
          slug: { equals: slug },
        },
        limit: 1,
      })

      if (existing.docs && existing.docs.length > 0) {
        // Update existing page
        await payload.update({
          collection: payloadSlug,
          id: existing.docs[0].id,
          data: {
            pageTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Page`,
            slug,
            ...content,
          },
        })
        console.log(`   ✅ Updated ${slug} page`)
      } else {
        // Create new page
        await payload.create({
          collection: payloadSlug,
          data: {
            pageTitle: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Page`,
            slug,
            ...content,
          },
        })
        console.log(`   ✅ Created ${slug} page`)
      }
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Create an admin user by running the app and visiting /admin')
    console.log('   2. Verify the content in the Payload admin panel')
    console.log('   3. Test the frontend to ensure all content displays correctly\n')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await client.close()
    process.exit(0)
  }
}

migrate()
