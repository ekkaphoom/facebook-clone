import React from 'react'
import StoryCard from './StoryCard'
const stories = [
  {
    name: 'Ekkaphoom Phaisanphatthanasuk',
    src: '/images/myCover.jpg',
    profile: '/images/myProfile.jpg'
  },

  {
    name: 'Elon Musk',
    src: 'https://links.papareact.com/4zn',
    profile: 'https://links.papareact.com/kxk'
  },
  {
    name: 'Jeff Bezoz',
    src: 'https://links.papareact.com/k2j',
    profile: 'https://links.papareact.com/f0p'
  },
  {
    name: 'Mark Zuckerberg',
    src: 'https://links.papareact.com/xql',
    profile: 'https://links.papareact.com/snf'
  },
  {
    name: 'Bill Gates',
    src: 'https://links.papareact.com/4u4',
    profile: 'https://links.papareact.com/zvy'
  },

]
const Stories = () => {
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
      {
        stories.map((x, index) => <StoryCard key={index} name={x.name} src={x.src} profile={x.profile}></StoryCard>)
      }
    </div>
  )
}

export default Stories
