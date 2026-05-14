---
trigger: always_on
---

# Project Rules: Course Recommendation Platform

## 1. Technical Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB via Mongoose.
- **Architecture:** Controller-Service-Route pattern.

## 2. Code Standards
- **Naming:** Use camelCase for variables/functions, PascalCase for React components.
- **Modularity:** No logic in Express routes; move business logic (especially matching algorithms) to a `services/` directory.
- **Clean Code:** Use functional components and Hooks. Avoid class-based components.
- **Error Handling:** All API responses must follow a standard structure: `{ success: boolean, data: [], message: string }`.

## 3. UI/UX Principles
- **Masonry First:** All course displays must use a masonry grid to reduce visual monotony.
- **Contextual Feedback:** Every course card must show a "Match Score" relative to the user's tags.
- **Performance:** Use `useMemo` for heavy tag-matching calculations on the frontend.

## 4. Constraints
- Do not add Auth (Passport/JWT) until v2. Use a static `USER_ID` header for v1 testing.
- Database seeds must always include Pluralsight as the primary provider.