import PostList from '@/components/posts/post-list';
import { fetchPostBySearchTerm } from '@/db/queries/posts';
import { redirect } from 'next/navigation';

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { term } = searchParams;

  if (!term) {
    redirect('/');
  }

  return <PostList fetchData={() => fetchPostBySearchTerm(term)} />;
};

export default SearchPage;
