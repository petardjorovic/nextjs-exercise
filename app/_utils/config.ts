function getKey(key: string | undefined, name: string): string {
  if (!key) throw new Error(`Enviroment variable ${name} is missing!`);
  return key;
}

export const config = {
  SUPABASE_URL: getKey(process.env.SUPABASE_URL, "SUPABASE_URL"),
  SUPABASE_KEY: getKey(process.env.SUPABASE_KEY, "SUPABASE_KEY"),
};
