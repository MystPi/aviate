import { type Forum, type Forums, type Category, categories, forums } from './consts';
import { InvalidArgumentError } from './errors';
import { z } from 'zod';

// --- Zod Schemas ---

const Count = z.object({
  count: z.number(),
});

type Count = typeof Count;

export const User = z.object({
  username: z.string(),
  id: z.number(),
  country: z.string(),
  status: z.string(),
  statistics: z
    .object({
      followers: z.number(),
    })
    .optional(),
});

export const ForumUser = z.object({
  counts: z
    .object(
      Object.keys(forums).reduce(
        (prev, curr) => ({
          ...prev,
          [forums[curr as Forum]]: Count,
        }),
        {}
      ) as Record<Forums[Forum], Count>
    )
    .partial()
    .optional(),
});

// --- Assertion Functions ---

export function assertCategory(value: any): asserts value is Category {
  if (!categories.includes(value)) {
    throw new InvalidArgumentError(`Invalid category: ${value}`);
  }
}

export function assertForum(value: any): asserts value is Forum {
  if (!Object.keys(forums).includes(value)) {
    throw new InvalidArgumentError(`Invalid forum: ${value}`);
  }
}

export function assertNumber(value: any): asserts value is number {
  if (typeof value !== 'number') {
    throw new InvalidArgumentError(`Invalid number: ${value}`);
  }
}