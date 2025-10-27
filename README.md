# Deck of Cards

This repo has been bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requirements

```
Node.js v22.20.0
pnpm latest
```

### Installing Node.js

You can download and install Node.js from the [official website](https://nodejs.org/en/download/).

If you've it already installed, you can check what version you are running:

```bash
node -v
```

A `.nvmrc` file is also in the root of the repo. If you've [nvm](https://github.com/nvm-sh/nvm) installed, you can switch to this version:

```bash
nvm use
```

### Installing pnpm

This repo uses `pnpm` to manage dependencies. To install `pnpm` globally:

```bash
npm install -g pnpm
```

Verify the installation with:

```bash
pnpm -v
```

## Getting Started

> [!NOTE]  
> When running some commands, the following message might appear in your terminal:
> "Warning: Found multiple lockfiles. Selecting path/to/package-lock.json"
> This is a Next.js bug: https://github.com/vercel/next.js/issues/82689

### Installing / Running the app

First, install the dependencies:

```bash
pnpm install
```

You will need a `.env` file in the root of the repo to run the app. To create one, copy `.env.local` and rename it to `.env`:

```bash
cp .env.example .env
```

Once you have a `.env` file and the packages have finished installing, you can run the app:

```bash
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) in your preferred browser.

### Linting

This project uses Biome for code quality and consistency. To run linting, run:

```bash
pnpm lint
```

### Unit Tests

This project uses [Vitest](https://vitest.dev/) for unit testing. To run the unit tests, run:

```bash
pnpm test
```

For watch mode, run:

```bash
pnpm test --watch
```

### Building

To build the app, run:

```bash
pnpm build
```

Once it has finished building, the app can be started, run:

```bash
pnpm start
```

## Todo / Nice to have's

If more time was available:

- Cache the deck ID. Since the deck can be used for 2 weeks, every refresh we are making a request to the Deck of Cards API, which is wasteful.
- Move CSS to a more maintainable solution.
- Add accessibility improvements, such as moving focus when a card is drawn, when the card's match, when the round has finished, etc.
- Add integration tests.
- Add axe-core to unit tests and jsx-a11y to help stop accessibility issues appearing from contributions.
- Set up Playwright and implement end-to-end tests.
- Automatically generate types from the Deck of Cards API.
- Enforce conventionally [git commit messages](https://www.conventionalcommits.org/en/v1.0.0/) with commitlint and husky.
