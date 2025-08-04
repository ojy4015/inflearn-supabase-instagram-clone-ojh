'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button, Input } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function SignIn({ setView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const supabase = createBrowserSupabaseClient();

  //signin mutation
  const signinMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      }
      if (data) {
        console.log('data : ', data);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={'/images/inflearngram.png'} className="w-60 mb-6" />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="email"
          type="email"
          className="w-full rounded-sm"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          type="password"
          className="w-full rounded-sm"
        />
        <Button
          onClick={() => {
            signinMutation.mutate();
          }}
          loading={signinMutation.isPending}
          disabled={signinMutation.isPending} // 로그인은 여러번 시도 가능
          color="light-blue"
          className="w-full text-md py-1"
        >
          로그인
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        아직 계정이 없으신가요?{' '}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView('SIGNUP')}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
