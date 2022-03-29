# nextcord.gay

A cloudflare worker to use the user-agent for ~~rickrolling~~ without a discord embed

## Build

1. `npm run build`
2. Find the output in `./dist/worker.mjs` (module syntax)

## Develop

1. Make a `.env` file based off the `.env.example` file - valid URL and ID
2. `npn run dev`
3. Visit <https://localhost:8787/>

## Test

1. `npm run test`

## Directory structure

- `.github/` - GitHub workflow scripts and configuration
- `./src/` - Source code
  - `index.ts` - Main entry point
  - `*.ts` - Other importable files, not used directly
- `./test/` - Tests
  - `globals.d.ts` - Globals found with the miniflare test environment
  - `tsconfig.json` - TypeScript configuration for test types
  - `*.test.ts` - Test files for the relevant files
- `./types/` - Type declarations
  - `domains.d.ts` - Domains interface for `domains.ts`
  - `env.d.ts` - Global environment variables found in the `env` namespace
- `.env.example` - Example environment variables
- `.gitignore` - Git ignore file
- `build.js` - Build script using `esbuild`
- `jest.config.js` - Configuration for jest in `./tests`
- `LICENSE` - `MIT` license file
- `package-lock.json` - `npm` lock file
- `package.json` - `npm` package file
- `README.md` - Hi
- `tsconfig.json` - TypeScript configuration for the project
- `wrangler.toml` - Config for wrangler - Cloudflare Workers CLI
