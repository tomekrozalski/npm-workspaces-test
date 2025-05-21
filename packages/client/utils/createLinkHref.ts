import { getContext } from "svelte";
import type { WorkspaceConfig } from "@pierce/client/types/WorkspaceConfig.d";

export function createLinkHref(path: string) {
  const { isoLocale, localizedPaths } = getContext(
    "workspaceConfig"
  ) as WorkspaceConfig;

  return localizedPaths ? "/" + isoLocale + path : path;
}
