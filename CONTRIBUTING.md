# Conventional Commits

This project uses [Conventional Commits](https://conventionalcommits.org/) for automated versioning and changelog generation.

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Examples

### Feature

```
feat(framer): add new showForProperty override function
```

### Bug Fix

```
fix(auth): handle undefined user state properly
```

### Breaking Change

```
feat!: redesign API interface

BREAKING CHANGE: The `withProperty` function now requires an options object instead of a string parameter.
```

### Documentation

```
docs: update README with new CDN examples
```

### Chore

```
chore: update dependencies to latest versions
```

## Version Bumping

- **feat**: Minor version bump (0.1.0 → 0.2.0)
- **fix**: Patch version bump (0.1.0 → 0.1.1)
- **BREAKING CHANGE**: Major version bump (0.1.0 → 1.0.0)
- **chore/docs/style**: No version bump

## Branches

- **main**: Production releases
- **beta**: Pre-releases (e.g., 0.2.0-beta.1)
