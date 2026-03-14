import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProductsAdminPageClient } from '@/components/admin/products-admin-client';

export default async function ProductsAdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // TODO: Add role check for admin
  // if (user.user_metadata?.role !== 'admin') {
  //   redirect('/dashboard');
  // }

  return <ProductsAdminPageClient />;
}
