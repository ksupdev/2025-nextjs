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

## Basic without userActionState
```typescript
"use client"

import React from 'react'

async function login(username: string, password: string) {

  username = "karn.yong@melivecode.com"
  password = "melivecode"
  const response = await fetch("https://www.melivecode.com/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password })
  })

  return response.json();
}

export default function basicLab() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usernameEntry = formData.get("username")
    const passwordEntry = formData.get("password")
    //console.log(username, password)

    // Check if entries are not null and cast them to string
    const username = usernameEntry !== null ? usernameEntry.toString() : '';
    const password = passwordEntry !== null ? passwordEntry.toString() : '';

    const rest = await login(username.toString(), password.toString())
    console.log(rest)

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required   autoComplete="current-password" 
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
```

## Basic with userActionState
```typescript
"use client"

import Image from 'next/image'
import React, { useActionState } from 'react'

async function login(previousState, formData) {

  // username = "karn.yong@melivecode.com"
  // password = "melivecode"
  const username = formData.get("username")
  const password = formData.get("password")

  const response = await fetch("https://www.melivecode.com/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password })
  })

  // console.log(response)

  return response.json();
}

export default function basicLab() {

  const [loginState, formAction, isPending] = useActionState(login, null)

  console.log(loginState)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Login</h2>
        <form action={formAction} >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required autoComplete="username" defaultValue={'karn.yong@melivecode.com'}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required autoComplete="current-password" defaultValue={'melivecode'}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={isPending}>
            {isPending ? "Loggin in .." : "Login"}
          </button>
        </form>
        {loginState && (
          <div>
            {loginState.status === "ok" ? (
              <div>
                <p>{loginState.user.fname}</p>
                <Image src={loginState.user.avatar} alt={'test'} width={100} height={100} />
              </div>
            ) : (
              <div>
                <p>{loginState.message}</p>
              </div>
            )}
          </div>
        )
        }
      </div>
    </div >
  )
}
```

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.melivecode.com",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;

```


