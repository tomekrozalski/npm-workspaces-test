<script lang="ts">
	import { setContext } from 'svelte';
	import type { WorkspaceConfig } from '@pierce/client/types/WorkspaceConfig.d';

	setContext<WorkspaceConfig>('workspaceConfig', { isoLocale: 'pl-pl', localizedPaths: true });

	const { children } = $props();
</script>

{@render children()}
