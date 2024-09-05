import styles from './page.module.css'
import dynamic from 'next/dynamic'
import footer from '@/components/footer'

const Scene = dynamic(() => import('@/components/Scene/Index'), {
    ssr: false,
})

export default function Home() {
  return (
    <main className={styles.main}>
        <Scene />
    </main>
  )
}