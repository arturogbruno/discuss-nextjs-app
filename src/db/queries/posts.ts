import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// Another option: Create the PostWithData type infering the return type of fetchPostsByTopicSlug
// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export const fetchPostsByTopicSlug = (slug: string): Promise<PostWithData[]> =>
  db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

export const fetchTopPosts = (): Promise<PostWithData[]> =>
  db.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });

export const fetchPostBySearchTerm = (term: string): Promise<PostWithData[]> =>
  db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
