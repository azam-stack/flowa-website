# Experiment branch

This branch is a sandbox copy of the Flowa website for trying things out.

**It cannot touch the live site.** The deploy workflow only runs on pushes to
`main`, so nothing pushed here is published to flowa.dk. Break whatever you like.

## Working on it

- Push to this branch freely. Nothing here goes live.
- To see a change, run it locally: `npm install`, then `npm run dev`.
- When an experiment is worth keeping, open a pull request from `experiment`
  into `main`. That is the only path to the live site, and the build checks
  run on it first.
- To start fresh, reset this branch from `main`.

## Do not

- Do not edit `.github/workflows/deploy.yml` to add this branch as a trigger.
  Two branches deploying to the same Pages site would fight over flowa.dk.
- Do not change `public/CNAME`. It belongs to the live site.
