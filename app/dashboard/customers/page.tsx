import CustomersTable from '@/components/shared/customers/table'
import { fetchFilteredCustomers } from '@/lib/actions/customer.actions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  
// Asegúrate de esperar a searchParams

const { query = '', page = '1' } = await searchParams || {};
const customers = await fetchFilteredCustomers(query);


  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  )
}
