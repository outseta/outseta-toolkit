# Outseta Toolkit - Modular Templates

This directory contains focused template files for different Outseta integration use cases. Each template is a standalone file that you can copy into your Framer project.

## Available Templates

### 📦 [Outseta.tsx](./Outseta.tsx) - All-in-One Template

- Complete integration with all functionality
- Single file with authentication, user data, plans, add-ons, bookmarks, and lessons
- Good for comprehensive projects that need everything

**Use when:** You want all functionality in one file and don't mind the larger size

### 🔧 [OutsetaAuth.tsx](./OutsetaAuth.tsx) - Authentication Controls

- Login/register/profile popups
- Logout functionality
- Show/hide based on auth status
- Authentication status variants

**Use when:** You need login flows and authentication-based visibility

### 👤 [OutsetaUser.tsx](./OutsetaUser.tsx) - User Data Display

- Display user names, email, avatar
- Account information display
- User property access

**Use when:** You need to show user information in your interface

### 💳 [OutsetaPlans.tsx](./OutsetaPlans.tsx) - Subscription Plans

- Plan-based visibility controls
- Plan status variants
- Current plan display

**Use when:** You have subscription tiers and need plan-based features

### 🔌 [OutsetaAddOns.tsx](./OutsetaAddOns.tsx) - Add-on Management

- Add-on based visibility
- Add-on status variants
- Current add-ons display

**Use when:** You sell add-ons and need add-on-based features

### 🔖 [OutsetaBookmarks.tsx](./OutsetaBookmarks.tsx) - Bookmark System

- Ready-made bookmark functionality
- Bookmark toggles and status
- Bookmark list display

**Use when:** You want users to bookmark content

### 📚 [OutsetaLessons.tsx](./OutsetaLessons.tsx) - Lesson Tracking

- Lesson completion tracking
- Progress indicators
- Completion toggles

**Use when:** You have educational content or courses

### 📝 [OutsetaCustom.tsx](./OutsetaCustom.tsx) - Custom Properties

- Examples for custom properties
- Property-based visibility
- Property toggles and variants

**Use when:** You need custom data fields beyond the built-in options

## How to Use

1. **Choose the template(s)** you need for your project
2. **Copy the entire file content** from the template
3. **Create a new code file** in your Framer project with the same name
4. **Paste the content** into your Framer code file
5. **Customize** the examples (especially plan UIDs, add-on UIDs, etc.)

## Combining Templates

You can use multiple templates in the same project:

```javascript
// In your Framer project, create multiple files:
// - OutsetaAuth.tsx (for login/logout)
// - OutsetaUser.tsx (for user display)
// - OutsetaPlans.tsx (for subscription features)
```

Each template is independent and can be used alone or combined with others.

## Setup Requirements

⚠️ **Before using any template:**

1. Add the Outseta script to your site's `<head>`
2. Configure your Outseta domain and options
3. Create required custom properties (noted in each template)

## Need Help?

- View the main [README](../README.md) for setup instructions
- Check [CONTRIBUTING](../CONTRIBUTING.md) for development info
- Open an issue on GitHub for support
