import { createFileRoute, redirect } from "@tanstack/react-router";

// O cadastro agora acontece na própria página do resultado; mantém o endereço antigo funcionando.
export const Route = createFileRoute("/grupo-vip")({
  beforeLoad: () => { throw redirect({ to: "/", statusCode: 301 }); },
});
