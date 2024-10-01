import { Suspense } from 'react';
import CommentCreateForm from '@/components/comments/comment-create-form';
import PostShow from '@/components/posts/post-show';
import paths from '@/paths';
import Link from 'next/link';
import CommentList from '@/components/comments/comment-list';
import { PostShowLoading } from '@/components/posts/post-show-loading';

interface PostShowPageProps {
  params: {
    postId: string;
    slug: string;
  };
}

const PostShowPage = ({ params }: PostShowPageProps) => {
  const { postId, slug } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
};

export default PostShowPage;
