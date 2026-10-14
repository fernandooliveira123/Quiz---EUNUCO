<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use a shared Button primitive for new interactive commands to keep control states consistent.
- VIP contacts are collected on a separate public route and written through a validated insert-only server function; never expose contact reads to visitors.
- Share one Zod contact schema between browser and server to keep submitted data validation consistent.
- Define quiz stage membership alongside each question in the shared question catalog so labels and transitions stay aligned with the question sequence.
