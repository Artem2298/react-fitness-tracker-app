import { z } from 'zod';

export const trainingSchema = z.object({
  title: z.string().min(1, 'Název je povinný').max(100, 'Název je příliš dlouhý'),
  type: z.enum(['RUN', 'WALK', 'BIKE', 'SWIM', 'SKI'], { message: 'Vyber typ tréninku' }),
  distance: z
    .string()
    .min(1, 'Vzdálenost je povinná')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Vzdálenost musí být kladné číslo'),
  description: z.string().max(500, 'Popis je příliš dlouhý').optional(),
  is_public: z.boolean(),
});

export function validateTraining(formData, duration) {
  const result = trainingSchema.safeParse(formData);
  const errors = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
  }

  if (duration <= 0) {
    errors.duration = 'Doba musí být větší než 0';
  }

  return errors;
}
