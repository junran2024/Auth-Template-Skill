# UI Components

This project uses hand-written shadcn-style components. No shadcn installation required.

## Why Hand-Written?

1. **Fewer dependencies**: No `@radix-ui/react-*` packages needed
2. **Full control**: Customize to project needs
3. **Learning value**: Understand component internals
4. **Smaller bundle**: Only include what you need

## Core Principles

1. **Tailwind CSS** for styling
2. **class-variance-authority (cva)** for variants
3. **CSS variables** for theming
4. **clsx + tailwind-merge** for class merging

## Available Components

| Component | File | Purpose |
|-----------|------|---------|
| Button | `templates/ui/button.tsx` | Buttons with variants |
| Card | `templates/ui/card.tsx` | Card containers |
| Input | `templates/ui/input.tsx` | Form inputs |
| Field | `templates/ui/field.tsx` | Form field layout |
| utils | `templates/utils.ts` | cn() utility |

## Button Variants

| Variant | Use Case |
|---------|----------|
| default | Primary actions |
| destructive | Delete/danger actions |
| outline | Secondary actions |
| ghost | Subtle actions |
| link | Text links |

## Button Sizes

| Size | Use Case |
|------|----------|
| sm | Compact UI |
| default | Standard |
| lg | Prominent actions |
| icon | Icon-only buttons |

## Theme System

The theme uses CSS variables defined in `globals.css`:
- Light mode: `:root` variables
- Dark mode: `.dark` class variables
- Color space: oklch (modern, wider gamut)

## Form Components

### Field Structure

```tsx
<FieldGroup>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" />
  </Field>
  <Field>
    <Button type="submit">Submit</Button>
  </Field>
</FieldGroup>
```

### FieldSeparator

Creates a visual divider with optional text:

```tsx
<FieldSeparator>Or continue with</FieldSeparator>
```
