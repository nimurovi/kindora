import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// path to your Better Auth server instance
import { headers } from "next/headers";
import { auth } from './lib/auth';
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {


    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user
    console.log("user", user)
    if (!user) {
        return NextResponse.redirect(new URL('/signin', request.url))
    } 

    
}

export const config = {
    matcher: ["/create-event","/joined-events","/manage-events"],
}