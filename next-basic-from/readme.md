#Basic form

### utils/actions.ts
```typescript
'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCamp(prevState, formData) {
    // const title = formData.get("title")
    // const location = formData.get("location")
    await new Promise((reslove) => setInterval(reslove, 1000))
    const rawData = Object.fromEntries(formData)

    console.log(rawData)
    // prisma.camp.create

    // revalidatePath("/camp")
    // redirect("/")

    return 'create camp success !!!'

}

export async function createCampBasic(formData) {
    const rawData = Object.fromEntries(formData)

    console.log(rawData)
    return 'create camp success !!!'

}

export async function fetchCamp() {
    const camps = [
        { id: 1, title: 'Bangkok' }
        , { id: 2, title: 'Ayu' }
        , { id: 3, title: 'Chaing' }
    ]
    return camps
}

```

### components/FormUseFormStatus.tsx
```typescript
"use client"
// import React, { useActionState } from 'react'
import { createCamp } from '@/utils/actions'
import { useActionState } from 'react'


export default function FormUseFormStatus() {

    const [message, formAction, pending] = useActionState(createCamp, null)

    return (
        <>
            {message && <h1>{message}</h1>}
            <form action={formAction} className="p-6 bg-white rounded-lg shadow-md">
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="title">
                    Camping Name
                </label>
                <input
                    placeholder="Camping Name"
                    name="title"
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    defaultValue="Bangkok"
                    id="title"
                />

                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="location">
                    Location
                </label>
                <input
                    placeholder="Location"
                    name="location"
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    defaultValue="Bangna"
                    id="location"
                />
                <button type='submit' className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" disabled={pending}>
                    {pending ? "Submiting...." : "Submit"}
                </button>
            </form>
        </>

    )
}
```

### components/CampList.tsx
```typescript

import { fetchCamp } from '@/utils/actions';
import React from 'react'

//rfce
async function CampList() {
    const camps = await fetchCamp();
    console.log(camps)
    return (
        <div>
            {
                camps.map((item, index) => {
                    return <li key={item.id}>{item.title}</li>
                })
            }
        </div>
    )
}

export default CampList

```

### app/camp/page.tsx
```typescript
import FormBasic from '@/components/FormBasic'
import FormUseActionStatus from '@/components/FormUseActionStatus'
import React from 'react'
import CampList from '@/components/CampList'

const CamePage = () => {
  return (
    <div>
      <p>Form userActionStatus</p>
      <FormUseActionStatus />
      <br />
      <hr />
      <p>Form Basic</p>
      <FormBasic />

      <hr />
      <CampList />
    </div>
  )
}

export default CamePage
```

### components/Counter.tsx
```typescript
"use client";
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="text-7xl gap-8">
      <button onClick={() => setCount(count - 1)}>
        -
      </button>
      {count}
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>)
}

export default Counter
```

## Basic API

### app/api/camp/route.ts
```typescript
import { fetchCamp } from "@/utils/actions"
import { NextResponse } from "next/server"

export async function GET(req: NextResponse): Promise<Response> {

    const { searchParams } = new URL(req.url)
    // console.log(req)
    //http://localhost:3000/api/camp?name=dddd
    console.log(searchParams.get("name"))
    const camps = await fetchCamp()
    return Response.json(camps)
}


```
Test http://localhost:3000/api/camp
```json
[
  {
    "id": 1,
    "title": "Bangkok"
  },
  {
    "id": 2,
    "title": "Ayu"
  },
  {
    "id": 3,
    "title": "Chaing"
  }
]
```
