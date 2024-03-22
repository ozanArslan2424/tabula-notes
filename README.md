# Tabula Notes
A simple and markdown compatible note taking web app. It's main purpose is to provide a more natural note taking experience by taking advantage of columns that are usually not included for digital note taking apps. Even though we use "sideways scrolling" notebooks in real life, digital note taking apps scroll vertically. Therefore, columns provide a notebook-like experience.

## Instructions:
1. Create an account.
2. Create books for top level categories. (Optionally with tasks.)
3. Create groups inside books for sub-categories.
4. Finally under each group, start writing your notes.

## Features:
- Credentials auth.
- Dashboard page for a list of your books with search.
- Books as top level categories, groups as sub-categories.
- Optional descriptions for books.
- Optional task lists (simple todo) for each book.
- Download as markdown functionality for notes.
- Download as markdown functionality for groups
- Download as markdown functionality for books.

## Future:
- Google and GitHub OAuth.
- Optional task lists (simple todo) for each note instead of book.
- User roles
- Tags and filter by tags features.
- Profile pictures for users.
- Better markdown support for editing.

## Dependencies:
```
    "@hookform/resolvers": "^3.3.4",
    "@lucia-auth/adapter-prisma": "^4.0.1",
    "@prisma/client": "^5.11.0",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tailwindcss/typography": "^0.5.10",
    "@uploadthing/react": "^6.4.0",
    "arctic": "^1.2.1",
    "argon2": "^0.40.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "dotenv": "^16.4.5",
    "lucia": "^3.1.1",
    "lucide-react": "^0.358.0",
    "next": "^14.1.3",
    "next-themes": "^0.3.0",
    "nodemailer": "^6.9.12",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.51.1",
    "react-markdown": "^9.0.1",
    "react-textarea-autosize": "^8.5.3",
    "remark-gfm": "^4.0.0",
    "sonner": "^1.4.3",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7",
    "uploadthing": "^6.6.0",
    "uuid": "^9.0.1",
    "vaul": "^0.9.0",
    "zod": "^3.22.4"
```