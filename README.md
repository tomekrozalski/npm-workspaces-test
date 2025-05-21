# Svelte apps with different routing configuration

## The issue

We need a Svelte application with two routing variants. One with locale inside URL pathname, eg. `/pl-pl/product/sku-1234` and another without locale, eg. `/product/sku-1234`.
Of course we can achieve that using SvelteKit [optional locale parameter](https://svelte.dev/docs/kit/advanced-routing#Optional-parameters). When a routing system gets complex, that solution is not enough though.
An example (double square brackets is optional parameter in SvelteKit):

```
routes
├── [[locale]]
│    └── [[department]]
│        └── product
│            ├── +page.server.ts
│            └── +page.svelte
└── +layout.svelte
```

That could be `/pl-pl/summer/product`, but also `/pl-pl/product` or just `/product`. Inside `+page.server.ts` we might check if we have a `locale` and `department` params and pass it through. It is doable, but brings a lot of complexity.
One example: we want to prohibit a pathname like `/pl-pl/product`, but allow `/summer/product` with redirection to `/en-gb/summer/product`. Still doable, but that is just a tip of the iceberg.

## Solution

We might work on simple npm workspaces. Kind of monorepository. In the `/apps` folder we will keep only the code related to a specific app behaviour - and in the `/packages` common code.
An example (single square brackets is required parameter in SvelteKit):

```
.
├── apps
│    ├── elephant (the app version with all params required)
│    │   ├── [locale]
│    │   │   └── [department]
│    │   │       └── product
│    │   │           ├── +page.server.ts
│    │   │           └── +page.svelte
│    │   └── +layout.svelte
│    └── giraffe (the app version without any parameter)
│        ├── product
│        │   ├── +page.server.ts
│        │   └── +page.svelte
│        └── +layout.svelte
└── packages
     ├── client
     └── server
```

This structure is more verbose: longer, but easier to understand. You might say: alright, but this way we need to create `/product/+page.svelte` twice. True, but inside both files we could have just:

```Svelte
<script lang="ts">
  import ProductPage from '@workspaces/client/pages/Product.svelte';
</script>

<ProductPage />
```

So in practice the `/apps` are just routing configuration for SvelteKit. Although it is more powerful and could help us in the future.

## Differences between regular SvelteKit and npm workspaces solutions

There is almost none. In regular SvelteKit we run projects by `npm run dev`. With npm workflows we run `npm run dev --workspace=elephant` or `npm run dev --workspace=giraffe`. So, that is another advantage - we run a specific version.
Same for other scripts like `build`, `lint` or `test:unit`.

----

## Example

Clone the repository (`npm clone git@github.com:tomekrozalski/npm-workspaces-test.git`) and install packages in the root of the project (`cd npm-workspaces-test` and `npm install`). Run the first app, elephant: `npm run dev --workspace=elephant`.
On the `http://localhost:5173/` you will see 404 page, because in this app locale is required. Move to `http://localhost:5173/pl-pl`:

<img width="1557" alt="image" src="https://github.com/user-attachments/assets/012b5124-6d6a-426c-928b-cf3ae607ba20" />

Notice that all links points to `/pl-pl/` pages.

Now stop the server and run the second app: `npm run dev --workspace=giraffe`. The `http://localhost:5173/pl-pl` gives 404 page, because in this app locale is forbiden. Move to `http://localhost:5173/`:

<img width="1557" alt="image" src="https://github.com/user-attachments/assets/441860f9-e5ef-4bcd-8e91-20ef96607e55" />

Notice that all links points to `/` pages (without locale).

Also take a look that we do not need to pass configuration between app version inside `/apps` folder and components inside `/packages`. We could just set a context inside app and then read it inside `/packages` files:

```TypeScript
import { getContext } from "svelte";
import type { WorkspaceConfig } from "@pierce/client/types/WorkspaceConfig.d";

export function createLinkHref(path: string) {
  const { isoLocale, localizedPaths } = getContext(
    "workspaceConfig"
  ) as WorkspaceConfig;

  return localizedPaths ? "/" + isoLocale + path : path;
}
```
