import Head from 'next/head'
import { getSession } from 'next-auth/client';
import Header from '../components/Header'
import Login from '../components/Login'

const Home = (props) => {
  console.log('session', props);
  const { session } = props
  if (!session) {
    return <Login />;
  }
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main>
        {/* sidebar */}
        {/* body */}
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