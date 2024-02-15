import { z } from 'zod';

/** Schema of environment variables */
const envVariablesSchema = z.object({
  /** Defines the URL used for API requests */
  VITE_API_URL: z.string().url(),
});

envVariablesSchema.parse(import.meta.env);

declare global {
  /** Interface of environment variables */
  interface ImportMetaEnv extends z.infer<typeof envVariablesSchema> {}
}

export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,
} as const;
