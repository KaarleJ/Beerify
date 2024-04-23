import { relations } from 'drizzle-orm';
import { pgTable, serial, text, smallint, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique(),
  password: text('password').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  rating: smallint('stars'),
  text: text('text'),
  beerName: text('beer_name'),
  authorId: integer('author_id').references(() => users.id),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  author: one(users, {
    fields: [reviews.authorId],
    references: [users.id],
  }),
}));
