'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { NhostClient } from '@nhost/nextjs';
import Cookies from 'js-cookie';

import Input from '~/components/input';
import SubmitButton from '~/components/submit-button';
import { NHOST_SESSION_KEY_SERVER } from '~/utils/nhost-constants';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN ?? 'local',
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
});

export default function SignInWithSecurityKey() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const { session, error } = await nhost.auth.signIn({
      email,
      securityKey: true,
    });

    if (error) {
      setError(error.message);
    }

    if (session) {
      Cookies.set(NHOST_SESSION_KEY_SERVER, btoa(JSON.stringify(session)), { path: '/' });
      router.push('/protected/todos');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-semibold">Sign In</h1>

      {error && <p className="mt-3 text-center font-semibold text-red-500">{error}</p>}

      <form className="w-full max-w-lg space-y-5" onSubmit={handleSignIn}>
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <SubmitButton type="submit" className="w-full">
          Sign In
        </SubmitButton>
      </form>
    </div>
  );
}
