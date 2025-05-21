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
│    └── giragge (the app version without any parameter)
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
