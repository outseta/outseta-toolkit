# Contributing to Outseta Toolkit

## Development Workflow

### Trunk-Based Development

This project uses trunk-based development with automatic pre-releases for all pull requests.

**Workflow:**

- All development happens on feature branches
- Pull requests automatically create pre-releases for testing
- Merging to `main` triggers production releases
- Pre-release branches are automatically managed by semantic-release

**Pre-release Testing:**

```bash
# Test pre-release locally
npm run prerelease

# Or use semantic-release dry-run directly
npm run semantic-release:dry-run
```

### Development Commands

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development build with watch
npm run dev

# Type checking
npm run type-check
```

### Testing with Local Server

For testing the built files from external servers or applications:

```bash
# Build and start the local server
npm run serve

# Or manually build and serve
npm run build
node server.js
```

The setup provides:

- Express server serving the `dist` files with CORS headers
- Helpful endpoints:
  - `GET /` - Server info and available endpoints
  - `GET /api/files` - List all available files with usage examples
- CORS-enabled for external testing

**Example usage from external sites:**

```javascript
// Import from your local server
import {
  triggerAction,
  triggerPopup,
  withUserProperty,
} from "http://localhost:3000/framer/overrides.js";
```

**For public testing, use ngrok:**

```bash
# In another terminal, expose locally
ngrok http 3000

# Then use the ngrok URL in your imports
import { triggerAction, triggerPopup, withUserProperty } from "https://your-ngrok-url.ngrok-free.app/framer/overrides.js";
```

## Conventional Commits

This project uses [Conventional Commits](https://conventionalcommits.org/) for automated versioning and changelog generation.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Examples

#### Feature

```
feat(framer): add new showForProperty override function
```

#### Bug Fix

```
fix(auth): handle undefined user state properly
```

#### Breaking Change

```
feat!: redesign API interface

BREAKING CHANGE: The `withProperty` function now requires an options object instead of a string parameter.
```

#### Documentation

```
docs: update README with new CDN examples
```

#### Chore

```
chore: update dependencies to latest versions
```

### Version Bumping

- **feat**: Minor version bump (0.1.0 → 0.2.0)
- **fix**: Patch version bump (0.1.0 → 0.1.1)
- **BREAKING CHANGE**: Major version bump (0.1.0 → 1.0.0)
- **chore/docs/style**: No version bump

### Branches

- **main**: Production releases (1.0.0, 1.1.0, etc.)
- **Any other branch**: Pre-releases (1.1.0-feature-auth.1, 1.1.0-hotfix-bug.1, etc.)

## Semantic Release

This project uses semantic-release for automated versioning and publishing.

### How It Works

1. **Create PR** → Triggers GitHub Action
2. **Analyze commits** → Determines version bump
3. **Create pre-release** → Publishes pre-release version
4. **Merge to main** → Triggers production release
5. **Update version** → Bumps package.json
6. **Generate changelog** → Updates CHANGELOG.md
7. **Publish to npm** → Publishes new version
8. **Create GitHub release** → Tags and release notes
9. **Commit changes** → Commits version files back to repo

### Available Scripts

- `npm run semantic-release` - Run semantic release
- `npm run semantic-release:dry-run` - Test without publishing
- `npm run prerelease` - Test pre-release locally
- `npm run build` - Build the package
- `npm run type-check` - TypeScript validation

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with conventional commit messages
3. Push your branch and create a pull request
4. The PR will automatically create a pre-release for testing
5. Once approved, merge to `main` for production release

## Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add proper type definitions
- Include JSDoc comments for public APIs
- Test your changes locally before submitting PRs
