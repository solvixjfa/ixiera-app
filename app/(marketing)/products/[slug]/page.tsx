import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/products/product-details';

async function getProduct(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://ixiera.id' : 'http://localhost:3000');
    const response = await fetch(`${baseUrl}/api/products/${slug}`, {
      next: { revalidate: 60 }, // Revalidate setiap 60 detik
    });
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = await getProduct(params.slug);

  if (!result) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${result.data.name} | Ixiera.id`,
    description: result.data.description,
    openGraph: {
      title: result.data.name,
      description: result.data.description,
      image: result.data.thumbnail,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const result = await getProduct(params.slug);

  if (!result) {
    notFound();
  }

  return (
    <ProductDetails
      product={result.data}
      relatedProducts={result.related || []}
    />
  );
}
