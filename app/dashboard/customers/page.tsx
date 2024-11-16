import CustomersTable from '@/components/shared/customers/table';
import { fetchFilteredCustomers } from '@/lib/actions/customer.actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  // Espera a que se resuelva searchParams
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query ?? ''; // Maneja undefined de forma segura
  const customers = await fetchFilteredCustomers(query); // Recupera datos con el query
  
  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}