function getKey(key: string | undefined, name: string): string {
  if (!key) throw new Error(`Enviroment variable ${name} is missing!`);
  return key;
}

export const config = {
  SUPABASE_URL: getKey(process.env.SUPABASE_URL, "SUPABASE_URL"),
  SUPABASE_KEY: getKey(process.env.SUPABASE_KEY, "SUPABASE_KEY"),
  NEXTAUTH_URL: getKey(process.env.NEXTAUTH_URL, "NEXTAUTH_URL"),
  NEXTAUTH_SECRET: getKey(process.env.NEXTAUTH_SECRET, "NEXTAUTH_SECRET"),
  AUTH_GOOGLE_ID: getKey(process.env.AUTH_GOOGLE_ID, "AUTH_GOOGLE_ID"),
  AUTH_GOOGLE_SECRET: getKey(
    process.env.AUTH_GOOGLE_SECRET,
    "AUTH_GOOGLE_SECRET"
  ),
  AUTH_GITHUB_ID: getKey(process.env.AUTH_GITHUB_ID, "AUTH_GITHUB_ID"),
  AUTH_GITHUB_SECRET: getKey(
    process.env.AUTH_GITHUB_SECRET,
    "AUTH_GITHUB_SECRET"
  ),
};
