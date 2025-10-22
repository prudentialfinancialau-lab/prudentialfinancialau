import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/var/www/development/upwork/loan-web/tinacms-app/tina/__generated__/.cache/1761112773517', url: 'https://content.tinajs.io/1.6/content/4283e962-a6ee-457f-b47a-23cc4a5ae779/github/main', token: '160bbe26b1293605cd34528135c8dabdc91e31c2', queries,  });
export default client;
  