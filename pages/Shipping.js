import { useRouter } from 'next/router';
import React from 'react';

export default function Shipping() {
  const router = useRouter();
  router.push('/Login');
  return <div>Shipping</div>;
}
