import Link from 'next/link'
import Date from '@/components/Date'

import {getSortedPostsData} from '@/lib/posts'
import Image from "next/image";
import SudokuGame from '@/components/SudokuGame'

type AllPostsData = {
  date: string
  title: string
  id: string
}[]

// Change this url to change the image!
const imageUrl = '/images/user-image.jpg';

export default function Home() {
  const allPostsData: AllPostsData = getSortedPostsData()

  return (
      <div className={'space-y-8'}>
        <section className={'rounded-3xl border border-pink-200 bg-white/80 p-6 shadow-lg shadow-pink-100'}>
          <p className={'prose max-w-none text-lg'}>
            Hey I&apos;m Ava, and this is my colorful little corner of the internet. I love building fun projects, sharing ideas, and making things that feel cheerful and creative.
          </p>
          <div className={'mt-4 flex flex-wrap items-center gap-3'}>
            <Link href={'https://github.com/ludu12/tech-journey-blog'} className={'btn btn-sm btn-primary rounded-full'}>
              Visit my GitHub
            </Link>
            <span className={'text-sm text-gray-600'}>✨ Welcome to my site ✨</span>
          </div>
        </section>

        <div className={'grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-center'}>
          <div className={'overflow-hidden rounded-3xl border border-pink-200 bg-white p-3 shadow-lg shadow-pink-100'}>
            <Image className={'rounded-2xl transition-transform duration-300 hover:scale-105'} src={imageUrl} alt={'My Image'} width={500} height={500}/>
          </div>
          <div className={'rounded-3xl border border-pink-200 bg-gradient-to-br from-pink-100 to-purple-100 p-6 shadow-lg shadow-pink-100'}>
            <h2 className={'text-2xl font-semibold text-pink-600'}>Fun stuff I&apos;m into</h2>
            <p className={'mt-3 text-gray-700'}>
              I&apos;m learning, creating, and exploring new ideas every day. This site is where I share my journey, projects, and little moments of inspiration.
            </p>
          </div>
        </div>

        <section className={'rounded-3xl border border-pink-200 bg-white/80 p-6 shadow-lg shadow-pink-100'}>
          <h2 className={'text-2xl font-semibold text-black'}>Blog</h2>
          <div className={'mt-6'}>
            <SudokuGame />
          </div>
          <ul className={'mt-4 space-y-3'}>
            {allPostsData.map(({id, date, title}) => (
                <li key={id}>
                  <Link href={`/posts/${id}`} className={'block rounded-2xl border border-pink-100 bg-pink-50 p-4 transition hover:-translate-y-1 hover:shadow-md'}>
                    <div className={'font-medium text-black'}>{title}</div>
                    <small className={'text-gray-600'}>
                      <Date dateString={date}/>
                    </small>
                  </Link>
                </li>
            ))}
          </ul>
        </section>
      </div>
  )
}
