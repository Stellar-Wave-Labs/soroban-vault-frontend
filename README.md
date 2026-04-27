# Soroban Vault

Soroban Vault is a public-facing app for timelocked, self-custody treasury operations on Soroban.

## Requirements

- Node >= 22
- npm

## Setup

1. npm install
2. npm run dev
3. Open http://localhost:3000

## Scripts

- npm run dev: start local development server
- npm run build: create production build
- npm run start: run production server
- npm run type-check: run TypeScript checks
- npm run lint: run lint checks

## Traction Loop

To improve maintainership and Wave acceptance signals, this repo runs a weekly loop:

1. Ship one visible product update.
2. Publish one public metrics snapshot.
3. Open one contributor-friendly issue.
4. Merge at least one external contribution.

### Suggested Weekly Metrics

- Landing page visitors
- Waitlist signups
- Share button clicks
- External contributors
- Testnet actions linked in issues or release notes

## Contributor Onboarding

1. Fork the repo and create a feature branch.
2. Run npm install and npm run dev.
3. Open an issue before large changes.
4. Submit a PR with a clear summary and screenshots for UI changes.

### Good First Issues Flow

1. Create issues labeled good-first-issue with clear acceptance criteria.
2. Include estimated effort and setup notes.
3. Link to relevant files and expected outcomes.
4. Add one maintainer comment with implementation hints.

## Maintainer Standards

- Keep PR review turnaround under 72 hours.
- Keep public roadmap and updates current.
- Prefer small, testable PRs over large rewrites.
- Track and publish progress in the repository regularly.
