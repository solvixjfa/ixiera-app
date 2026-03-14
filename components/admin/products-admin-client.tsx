'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductFormDialog } from '@/components/admin/product-form-dialog';
import { ProductTable } from '@/components/admin/product-table';
import { createClient } from '@/lib/supabase/client';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export function ProductsAdminPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category, price, is_active, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;

      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  // Handle edit
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  // Handle form success
  const handleFormSuccess = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 md:px-6 py-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Products Management
            </h1>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setDialogOpen(true);
              }}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              + Add New Product
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Total Products
              </p>
              <p className="text-3xl font-bold text-black dark:text-white">
                {products.length}
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Active Products
              </p>
              <p className="text-3xl font-bold text-black dark:text-white">
                {products.filter((p) => p.is_active).length}
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Total Revenue (est.)
              </p>
              <p className="text-3xl font-bold text-black dark:text-white">
                Rp {products
                  .reduce((sum, p) => sum + p.price, 0)
                  .toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Products Table */}
          <ProductTable
            products={products}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Form Dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        product={
          editingProduct
            ? {
                ...editingProduct,
                slug: '',
                description: '',
                full_description: '',
                features: [],
                technologies: [],
                thumbnail: '',
              }
            : undefined
        }
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}