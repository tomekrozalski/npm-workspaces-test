<script lang="ts">
	import { setContext } from 'svelte';
	import type { WorkspaceConfig } from '@pierce/client/types/WorkspaceConfig.d';

	setContext<WorkspaceConfig>('workspaceConfig', { isoLocale: 'pl-pl', localizedPaths: false });

	const { children } = $props();
</script>

{@render children()}
