# Run the project

```powershell
cd C:\Users\study\Desktop\ucb\info153\in-person-project-7-xingzhi0317
npm install
npm run dev:all
```

Open http://localhost:5173. The project API runs at http://localhost:3001/projects.
Keep both servers running. Stop them with Ctrl+C.

Implemented: theme Context and localStorage persistence; projects Context with fetch, HTTP error checks and effect cleanup; loading/error/retry rendering; category filtering; POST form; 500 ms debounced search; optimistic deletion with rollback; GitHub repository fetching with loading/error states. Reflection answers are in REFLECTION.md. Personal content is migrated from p6: XINGZHI WU, five skills, contact details, and two projects. The original frontend/webapp categories map to web; no project image or destination URL was provided.

Validation: production build passed; browser checks passed for theme persistence, API cards (the personalized dataset now contains two projects), filtering, debouncing, POST persistence, DELETE persistence, failed-delete rollback, loading/error/retry, mobile width, and absence of JavaScript exceptions. GitHub success rendering was checked with a simulated response; the live API returned HTTP 403 due to the network's unauthenticated rate limit, and the error displayed correctly. Temporary test projects were removed.

Changes are saved locally. To submit, commit and push the project to GitHub, then submit the repository URL in bCourses as instructed in README.md.
