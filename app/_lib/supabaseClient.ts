import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { config } from "../_utils/config";

export const supabase = createClient<Database>(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
);
