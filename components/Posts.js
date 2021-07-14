import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase';
import Post from './Post'

function Posts() {
  const [realtimePosts] = useCollection(
    db.collection('posts').orderBy('timestamp', 'desc')
  );

  return (
    <div className='bg-blue-900'>
      {realtimePosts?.docs.map((post, index) => {
        console.log('post', index, post)
        return <Post
          key={index}
          {...post.data()} />
      })}
    </div>
  )
}

export default Posts
