# Contributing to Outseta Toolkit

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/outseta-toolkit.git
cd outseta-toolkit

# Install dependencies
npm install

# Build the library
npm run build

# Development build with watch mode
npm run dev

# Type checking
npm run type-check
```

## Development Workflow

### Code Style

- Follow TypeScript best practices
- Use descriptive variable and function names

### Testing

#### Local Development Server

For testing built files from external applications:

```bash
# Build and start the local server
npm run serve

# Or manually build and serve
npm run build
node server.js
```

The development server provides:

- Express server serving `dist` files with CORS headers
- API endpoints:
  - `GET /` - Server info and available endpoints
  - `GET /api/files` - List all available files with usage examples
- CORS-enabled for external testing

#### External Testing

**Local testing:**

```javascript
// Import from your local server
import {
  auth,
  user,
  plans,
  addOns,
  custom,
  bookmarks,
  lessons,
} from "http://localhost:3000/framer/overrides.js";
```

**Public testing with ngrok:**

```bash
# Expose local server publicly
ngrok http 3000
```

```javascript
// Use ngrok URL in imports
import {
  auth,
  user,
  plans,
  addOns,
  custom,
  bookmarks,
  lessons,
} from "https://your-ngrok-url.ngrok-free.app/framer/overrides.js";
```

## Contributing Guidelines

### 🚨 **REQUIRES** - Before Contributing

- Read the repository's tone guidelines in the cursor rules
- Ensure your code follows TypeScript best practices
- Test your changes with the local development server and ngrok
- Verify type checking passes (`npm run type-check`)

### Issue Reporting

When reporting issues:

1. Use the issue template
2. Provide clear reproduction steps
3. Include environment details (Node.js version, browser, etc.)
4. Add relevant code examples

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature-name`)
3. **Make** your changes following the code style guidelines
4. **Test** your changes thoroughly
5. **Commit** with clear, descriptive messages
6. **Push** to your fork
7. **Submit** a pull request

### Pull Request Guidelines

- Use descriptive titles and descriptions
- Reference related issues
- Include screenshots for UI changes
- Ensure all checks pass
- Request review from maintainers

### Code Review

- All pull requests require review
- Address feedback promptly
- Keep discussions focused and constructive
- Maintain the repository's professional tone

## Project Structure

```
src/
├── auth-store/          # Authentication state management
├── framer/
│   └── overrides/       # Framer overrides
└── outseta/             # Core Outseta integration logic
```

## Release Process

- Maintainers handle releases
- Follow semantic versioning
- Update CHANGELOG.md for significant changes
- Test releases before publishing
