import Breadcrumbs from '@/components/shared/invoices/breadcrumbs'
import EditInvoiceForm from '@/components/shared/invoices/edit-form'
import { fetchCustomers } from '@/lib/actions/customer.actions'
import { fetchInvoiceById } from '@/lib/actions/invoice.actions'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Invoice',
}

export default async function Page({ params }: { params: { id: string } }) {
    // Esperar a que params se resuelva 
    const { id } = await params;
    
    // Obtener la factura y los clientes de forma paralela 
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);

    // Verificar si la factura existe
    if (!invoice) {
      notFound(); // Llama a notFound si la factura no se encuentra
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  )
}
