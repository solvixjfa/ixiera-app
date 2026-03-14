import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Short description must be at least 10 characters'),
  full_description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be greater than 0'),
  features: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  thumbnail: z.string().url('Invalid URL').optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
