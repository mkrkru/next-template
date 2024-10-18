'use client';
import { useEffect } from 'react';
import { getAuth } from '@/api/cookiesStore';
import { useRouter } from 'next/navigation';

export default function Redirect() {
    const router = useRouter();

    useEffect(() => {
        if (!!getAuth()) router.replace('/');
        else router.replace('/auth');
    }, [router]);

    return <></>;
}