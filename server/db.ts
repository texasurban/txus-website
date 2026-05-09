import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, InsertContactSubmission, contactSubmissions, articles } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new contact submission.
 * Stores the submission in the database and returns the created record.
 */
export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create contact submission: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(contactSubmissions).values(submission);
    console.log("[Database] Contact submission created:", result);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create contact submission:", error);
    throw error;
  }
}

/**
 * Get all contact submissions (for admin dashboard).
 */
export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact submissions: database not available");
    return [];
  }

  try {
    const result = await db.select().from(contactSubmissions);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get contact submissions:", error);
    throw error;
  }
}


/**
 * Create a new article.
 */
export async function createArticle(article: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(articles).values(article);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create article:", error);
    throw error;
  }
}

/**
 * Get all published articles, ordered by published date (newest first).
 */
export async function getPublishedArticles() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get articles: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(articles)
      .where(eq(articles.published, 1))
      .orderBy(desc(articles.publishedAt))
      .limit(100);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get articles:", error);
    throw error;
  }
}

/**
 * Get a single article by slug.
 */
export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get article: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.published, 1)))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get article:", error);
    throw error;
  }
}

/**
 * Update an article.
 */
export async function updateArticle(id: number, updates: any) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .update(articles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(articles.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update article:", error);
    throw error;
  }
}
