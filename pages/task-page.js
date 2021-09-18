import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Layout from '../components/Layout'
import Task from '../components/Task'
import { getAllTasksData } from '../lib/tasks'
import useSWR from 'swr'
import { useEffect } from 'react'
import StateContextProvider from '../context/StateContext'
import TaskForm from '../components/TaskForm'

const fetcher = (url) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`

export default function TaskPage({ staticFilteredTasks }) {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks,
  })
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  useEffect(() => {
    mutate()
  }, [])

  return (
    <StateContextProvider>
      <Layout title='Task page'>
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        <Link href='/main-page'>
          <div className='flex cursor-pointer mt-12'>
            <ChevronDoubleRightIcon className='w-6 h-6 mr-3' />
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  )
}

export async function getStaticProps() {
  const staticFilteredTasks = await getAllTasksData()

  return {
    props: { staticFilteredTasks },
    revalidate: 3,
  }
}
