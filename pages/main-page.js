import { LogoutIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import Layout from '../components/Layout'
import Link from 'next/link'

const cookie = new Cookies()

export default function MainPage() {
  const router = useRouter()
  const logout = () => {
    cookie.remove('access_token')
    router.push('/')
  }
  return (
    <Layout title='main-page'>
      <div className='mb-10'>
        <Link href='/blog-page'>
          <a className='bg-indigo-500 mr-8 hover:bg-indigo-600 px-4 py-12 rounded'>
            Visit Blog by SSG + ISR
          </a>
        </Link>
        <Link href='/task-page'>
          <a className='bg-gray-500 mr-8 hover:bg-gray-600 px-4 py-12 rounded'>
            Visit Task by ISR + CSR
          </a>
        </Link>
      </div>
      <LogoutIcon onClick={logout} className='mt-10 cursor-pointer w-6 h-6' />
    </Layout>
  )
}
