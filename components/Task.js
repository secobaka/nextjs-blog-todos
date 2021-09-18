import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { StateContext } from '../context/StateContext'
import { useContext } from 'react'

const cookie = new Cookies()

export default function Task({ task, taskDeleted }) {
  const { setSelectedTask } = useContext(StateContext)
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT token not valid')
      }
    })

    taskDeleted()
  }

  return (
    <div>
      <span>{task.id}</span>
      {' : '}
      <Link href={`/tasks/${task.id}`}>
        <span className='cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600'>
          {task.title}
        </span>
      </Link>
      <div className='float-right ml-20'>
        <PencilAltIcon
          className='w-6 h-6 float-left cursor-pointer'
          onClick={() => setSelectedTask(task)}
        />
        <TrashIcon
          className='w-6 h-6 mr-2 cursor-pointer'
          onClick={deleteTask}
        />
      </div>
    </div>
  )
}
