import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches dedicated offer routes for LP1 and LP2", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const proMatches = router.matchRoutes("/oferta-pro");
    expect(proMatches.at(-1)?.routeId).toBe("/oferta-pro");

    const startMatches = router.matchRoutes("/oferta-start");
    expect(startMatches.at(-1)?.routeId).toBe("/oferta-start");

    const crmMatches = router.matchRoutes("/crm");
    expect(crmMatches.at(-1)?.routeId).toBe("/crm");
  });
});

