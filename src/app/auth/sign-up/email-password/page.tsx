'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNhostClient } from '@nhost/nextjs';

import Input from '~/components/input';
import SubmitButton from '~/components/submit-button';
import { signUp } from '~/app/server-actions/auth';

export default function SignUpWithEmailAndPassword() {
  const [error, setError] = useState('');
  const nhost = useNhostClient();
  const router = useRouter();

  async function handleSignUp(formData: FormData) {
    const response = await signUp(formData);

    if (response?.error) {
      setError(response.error);
      return;
    }

    if (response.success && response.session) {
      const {
        session: { refreshToken },
      } = response;
      if (refreshToken) {
        await nhost.auth.refreshSession(refreshToken);
        router.push('/');
      }
    } else {
      setError('An email was sent to your email address with a link to verify your account.');
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl font-semibold">Sign Up</h1>

      {error && <p className="mt-3 text-center font-semibold text-red-500">{error}</p>}

      <form className="space-y-5" action={handleSignUp}>
        <Input label="First Name" id="firstName" name="firstName" required />
        <Input label="Last Name" id="lastName" name="lastName" required />
        <Input label="Email" id="email" name="email" type="email" required />
        <Input label="Password" id="password" name="password" type="password" required />
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </form>
    </>
  );
}
