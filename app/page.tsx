import AddUserForm from '@/components/ui-parts/addUserForm/AddUserForm'
import Modal from '@/components/ui-parts/modal/Modal'
import SearchForm from '@/components/ui-parts/searchForm/SearchForm'
import UsersList from '@/components/ui-parts/usersList/UsersList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search APP',
  description: 'This is Search App!!!',
}

export default function Home() {

  return (
    <main>
      <section className="p-8">
        <div className="mb-2 grid place-items-end">
          <Modal>
            <AddUserForm />
          </Modal>
        </div>
        <SearchForm />
        <div className="mt-4">
          <UsersList />
        </div>
      </section>
    </main>
  )
}
