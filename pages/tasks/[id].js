import Link from 'next/dist/client/link'
import Layout from '../../components/Layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getAllTaskIds, getTaskData } from '../../lib/tasks'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Task({ staticTask, id }) {
  const router = useRouter()

  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  )

  useEffect(() => {
    mutate()
  }, [])

  if (router.isFallback || !task) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={task.title}>
      <span className='mb-4'>
        {'ID : '}
        {task.id}
      </span>
      <p className='mb-4 text-xl font-bold'>{task.title}</p>
      <p className='mb-12'>{task.created_at}</p>
      <Link href='/task-page'>
        <div className='flex cursor-pointer mt-8'>
          <ChevronDoubleLeftIcon className='w-6 h-6 mr-3' />
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllTaskIds()

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { task: staticTask } = await getTaskData(params.id)

  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  }
}
