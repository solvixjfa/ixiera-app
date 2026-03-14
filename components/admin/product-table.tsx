'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({
  products,
  isLoading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-gray-800">
              <TableHead className="bg-gray-50 dark:bg-gray-800">Name</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-800">Category</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-800">Price</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-800">Status</TableHead>
              <TableHead className="bg-gray-50 dark:bg-gray-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-gray-200 dark:border-gray-800">
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-16" />
                    <Skeleton className="h-9 w-16" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center bg-white dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 mb-2">No products found</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Create your first product to get started
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <TableHead className="font-bold text-black dark:text-white">Name</TableHead>
            <TableHead className="font-bold text-black dark:text-white">Category</TableHead>
            <TableHead className="font-bold text-black dark:text-white">Price</TableHead>
            <TableHead className="font-bold text-black dark:text-white">Status</TableHead>
            <TableHead className="font-bold text-black dark:text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell className="font-medium text-black dark:text-white">
                {product.name}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {product.category}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                Rp {product.price.toLocaleString('id-ID')}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    product.is_active
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }
                >
                  {product.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(product)}
                    variant="outline"
                    className="text-xs border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete "${product.name}"?`
                        )
                      ) {
                        onDelete(product.id);
                      }
                    }}
                    variant="outline"
                    className="text-xs border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
