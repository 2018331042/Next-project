import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Store } from '../utils/Store';

export default function Shipping() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/Login?redirect=Shipping');
    }
  }, [userInfo]);

  return <div>Shipping</div>;
}
