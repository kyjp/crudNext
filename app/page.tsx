import SearchForm from '@/components/ui-parts/SearchForm/SearchForm'
import UsersList from '@/components/ui-parts/UsersList/UsersList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search APP',
  description: 'This is Search App!!!',
}

export default function Home() {

  return (
    <main>
      <section className="p-8">
        <SearchForm />
        <div className="mt-4">
          <UsersList />
        </div>
      </section>
    </main>
  )
}
