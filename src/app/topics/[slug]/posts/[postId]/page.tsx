import CommentCreateForm from '@/components/comments/comment-create-form';
import PostShow from '@/components/posts/post-show';
import paths from '@/paths';
import Link from 'next/link';
import CommentList from '@/components/comments/comment-list';
import { fetchCommentsByPostId } from '@/db/queries/comments';

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
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
};

export default PostShowPage;
