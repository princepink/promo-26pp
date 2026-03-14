import { useTranslation } from 'react-i18next';
import { Career, CareerSchema } from '../@types/career';
// import { z } from 'zod';

// const CareerSchema: z.ZodType<Career> = z.lazy(() =>
//   z.object({
//     title: z.string(),
//     fromY: z.number(),
//     toY: z.number(),
//     achievements: z.array(z.string()),
//     description: z.string(),
//     children: z.array(CareerSchema),
//   }),
// );

export function useCareers(): Career[] {
  const { t } = useTranslation();
  const raw = t('careers', { returnObjects: true });

  if (!Array.isArray(raw)) return [];

  return raw.map((item) => CareerSchema.parse(item));
}
