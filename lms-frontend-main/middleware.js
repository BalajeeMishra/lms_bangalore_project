import { NextResponse } from "next/server";

export default function middleware(req){
    let verfiy = req.cookies.get('loggedIn');
    let type = req.cookies.get('type');
    let url = req.url;
    let redirect_url=process.env.NEXT_PUBLIC_REDIRECT_PATH

    if((!verfiy && url.includes('/faculty')) || (!verfiy &&  url.includes('/student'))) {
        return NextResponse.redirect(`${redirect_url}`);
    }

    if(verfiy && type === 'student') {
        if(url.includes('/faculty') || url === `${redirect_url}/login`) {
            return NextResponse.redirect(`${redirect_url}/student-my-courses`);
        }
    }
    if(verfiy && type === 'teacher') {
        if(url === `${redirect_url}/login` || url.includes('/student')) {
            return NextResponse.redirect(`${redirect_url}/faculty`);
        }
    }
}
