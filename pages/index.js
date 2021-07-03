import Head from 'next/head'
import { getSession } from 'next-auth/client';
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

const Home = (props) => {
  console.log('session', props);
  const { session } = props
  if (!session) {
    return <Login />;
  }
  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className='flex'>
        {/* sidebar */}
        <Sidebar />

        {/* body */}
        <Feed />
        {/* widget */}
      </main>
    </div>
  )
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log('xxxsession', session)
  return {
    props: {
      session
    }
  }
}