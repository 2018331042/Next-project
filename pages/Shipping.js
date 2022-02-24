import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Shipping() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  if (!userInfo) {
    router.push('/Login?redirect=Shipping');
  }
  return <div>Shipping</div>;
}
