# Screenshot loop — verify visual work

For any visual or UI change, screenshot the rendered output and iterate against a target before declaring done. Type checks and tests verify code correctness; they don't verify that the page looks right.

## The loop

1. Render the route locally: `npm run dev`, hit `/<slug>` (e.g. `/ChIJ_HOT_001` for the plumber fixture).
2. Screenshot the rendered page.
3. Compare to the target (a sibling vertical's polish level, a reference design, or the previous state if you're refactoring).
4. List the gaps in plain language.
5. Fix the highest-impact gap.
6. Repeat until the gaps you care about are closed — usually 2–4 iterations.

## When this applies

Apply the loop to:

- Adding or modifying a vertical's section layout, copy, or palette.
- Refactoring shared section components (`Hero.tsx`, `Services.tsx`, etc.) — verify both live verticals still render correctly.
- Changes to `globals.css` that touch `--brand-*` tokens or layout primitives.
- Anything where a reviewer would reasonably ask "did you look at it?"

Don't apply for:

- Pure type changes, schema edits, dispatcher logic, sheets client work — code-level verification is enough.
- Renames, comment edits, formatting-only changes.

## Tooling

The fastest visual-verify path is the Chrome DevTools MCP if installed — it lets Claude open the route, screenshot, and compare without leaving the session. If it's not installed, the human screenshots and pastes back into chat.

When verifying against a sibling vertical, screenshot **both** at the same viewport (1440 desktop or 390 mobile). Mismatched viewports produce noise that wastes iterations.

## Stop conditions

- Token budget is finite. Don't iterate past the point of diminishing returns — 4 iterations rarely add value over 3.
- If you're chasing a moving target (the design intent itself isn't clear), stop and ask the human rather than guessing for another 3 iterations.
- "Looks like the sibling vertical" is a real stop condition. Pixel-perfect parity is rarely worth the cost.
