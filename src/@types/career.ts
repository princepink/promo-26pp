import { z } from 'zod';

interface Career {
  title?: string;
  key?: string;
  fromY?: number;
  toY?: number;
  sphere?: string;
  tradeName?: string;
  achievements?: string[];
  description?: string;
  children?: Career[]; // recursion
}

export const CareerSchema: z.ZodType<Career> = z.lazy(() =>
  z.object({
    title: z.string().optional(),
    key: z.string().optional(),
    fromY: z.number().optional(),
    toY: z.number().optional(),
    sphere: z.string().optional(),
    tradeName: z.string().optional(),
    achievements: z.array(z.string()).optional(),
    description: z.string().optional(),
    children: z.array(CareerSchema).optional(),
  }),
);

export type { Career };
