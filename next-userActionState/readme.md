# Labs What is userActionState
Youtube [here]([myLib/README.md](https://www.youtube.com/watch?v=Qx2-jZJyQUM))

API sample for test [here](https://melivecode.com/)
```json
Method: POST

URL: https://www.melivecode.com/api/login

Body:

{
  "username": "karn.yong@melivecode.com",
  "password": "melivecode",
  "expiresIn": 60000
}
*expiresIn, i.e., token expire time (millisec), is optional
Response (200: OK):

{
  "status": "ok",
  "message": "Logged in",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cC...",
  "expiresIn": 60000,
  "user": {
    "id": 1,
    "fname": "Karn",
    "lname": "Yong",
    "username": "karn.yong@melivecode.com",
    "email": "karn.yong@melivecode.com",
    "avatar": "https://www.melivecode.com/users/1.png"
  }
}
Response (400: Bad Request):

{
  "status": "error",
  "message": "Missing username and/or password"
}
Response (401: Unauthorized):

{
  "status": "error",
  "message": "Login failed"
}
```

## Generate project

Create Next project
```sh
npx create-next-app next-userActionState

✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

Open the page.tsx file located at app/page.tsx and delete all its content. Then, use the rafce shortcut to generate the following code.
```typescript
```


