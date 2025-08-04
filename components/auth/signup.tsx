// 인증구현 - 인증링크 방식 회원가입
// 'use client';
// import { createBrowserSupabaseClient } from '@/utils/supabase/client';
// import { Button, Input } from '@material-tailwind/react';
// import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';

// export default function SignUp({ setView }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState(''); //edme5757
//   const [confirmationRequired, setConfirmationRequired] = useState(false); // 버튼 여러번 누루기 방지

//   const supabase = createBrowserSupabaseClient();

//   //signup mutation
//   const signupMutation = useMutation({
//     mutationFn: async () => {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: `http://localhost:3000/signup/confirm`,
//         },
//       });
//       if (error) {
//         alert(error.message);
//       }
//       if (data) {
//         setConfirmationRequired(true);
//       }
//     },
//   });

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
//         <img src={'/images/inflearngram.png'} className="w-60 mb-6" />
//         <Input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           label="email"
//           type="email"
//           className="w-full rounded-sm"
//         />
//         <Input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           label="password"
//           type="password"
//           className="w-full rounded-sm"
//         />
//         <Button
//           onClick={() => {
//             signupMutation.mutate();
//           }}
//           loading={signupMutation.isPending}
//           disabled={confirmationRequired} // 한번 눌러지면 더 이상 눌러지지 않도록
//           color="light-blue"
//           className="w-full text-md py-1"
//         >
//           {confirmationRequired ? '이메일을 확인해주세요' : '가입하기'}
//         </Button>
//       </div>

//       <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
//         이미 계정이 있으신가요?{' '}
//         <button
//           className="text-light-blue-600 font-bold"
//           onClick={() => setView('SIGNIN')}
//         >
//           로그인하기
//         </button>
//       </div>
//     </div>
//   );
// }

// - 유저는 이메일로 전송된 인증 링크를 클릭
//     - 인증 링크 = https://skmyfwmrpvpkushpelda.supabase.co/auth/v1/verify?token=pkce_0d5a330aa9180d2e260304e0d033b9e5dc7be9b12b91c6ec04692048&type=signup&redirect_to=http://localhost:3000/signup/confirm

//////////////////////////////////////////////////////////////////////
// 인증구현 - 로그인, 6-digit OTP 회원가입 구현

'use client';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button, Input } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function SignUp({ setView }) {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); //edme5757
  const [confirmationRequired, setConfirmationRequired] = useState(false); // 버튼 여러번 누루기 방지

  const supabase = createBrowserSupabaseClient();

  //signup mutation for 인증링크 방식 회원가입
  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `http://localhost:3000/signup/confirm`,
        },
      });
      if (error) {
        alert(error.message);
      }
      if (data) {
        setConfirmationRequired(true);
      }
    },
  });

  //signup mutation for 6-digit OTP 회원가입 구현
  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: 'signup',
        email,
        token: otp,
      });
      if (error) {
        alert(error.message);
      }
      if (data) {
        console.log(data);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={'/images/inflearngram.png'} className="w-60 mb-6" />
        {confirmationRequired ? (
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label="otp"
            type="text"
            className="w-full rounded-sm"
            placeholder="6자리 OTP를 입력해주세요."
          />
        ) : (
          <>
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
          </>
        )}

        <Button
          onClick={() => {
            if (confirmationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signupMutation.mutate();
            }
          }}
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          color="light-blue"
          className="w-full text-md py-1"
        >
          {confirmationRequired ? '인증하기' : '가입하기'}
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        이미 계정이 있으신가요?{' '}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView('SIGNIN')}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
