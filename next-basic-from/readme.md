#Basic form

// utils/actions.ts
```typescript
// utils/actions.ts
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
