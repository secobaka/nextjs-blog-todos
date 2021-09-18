import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ post }) {
  const router = useRouter()

  if (!post || router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={post.title}>
      <p className='m-4'>
        {'ID : '}
        {post.id}
      </p>
      <p className='mb-4 text-xl font-bold'>{post.title}</p>
      <p className='mb-12'>{post.created_at}</p>
      <p className='px-10'>{post.content}</p>
      <Link href='/blog-page'>
        <div className='flex cursor-pointer mt-12'>
          <ChevronDoubleLeftIcon className='w-6 h-6 mr-3'></ChevronDoubleLeftIcon>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { post: post } = await getPostData(params.id)

  return {
    props: {
      post,
    },
    revalidate: 3,
  }
}
