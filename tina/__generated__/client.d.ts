import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '7a799e4a82bd978cb82189e79b41f7197bce2b45', queries,  });
export default client;
  