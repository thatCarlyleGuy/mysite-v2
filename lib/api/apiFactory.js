import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export const getEntriesBySlugFactory =
  (directoryName) =>
  (slug, fields = []) => {
    const realSlug = slug.replace(/\.md$/, '');
    const directory = join(process.cwd(), directoryName);
    const fullPath = join(directory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }

      if (typeof data[field] !== 'undefined') {
        items[field] = data[field];
      }
    });

    return items;
  };

export const getAllEntriesFactory =
  (directoryName) =>
  (fields = []) => {
    const directory = join(process.cwd(), directoryName);
    const slugs = fs.readdirSync(directory);
    const getEntriesBySlugs = getEntriesBySlugFactory(directory);

    const posts = slugs
      .map((slug) => getEntriesBySlugs(slug, fields))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
  };
