import { dictionaries, type Dictionary, type Locale } from "./types";

export type { Dictionary, Locale };
export { dictionaries };

const DEFAULT_LOCALE: Locale = "en";

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Promise<Dictionary> {
  return dictionaries[locale]?.() ?? dictionaries.en();
}
