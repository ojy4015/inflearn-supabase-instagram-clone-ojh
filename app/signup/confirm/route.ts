import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server';

// supabase 서버에서 본인 인증을 마치고 redirect_to에 적힌 링크로 돌아온다. 이 때 code라는 searchParam을 전송
// http://localhost:3000/signup/confirm?code=bf3c803e-84ab-446b-a897-f48a1d0f4dc0
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // Web Client에서는 전송받은 code값을 활용해서 로그인 세션을 획득
  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // localhost:3000/ 으로 리다이렉트
  return NextResponse.redirect(requestUrl.origin);
}
