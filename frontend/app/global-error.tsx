'use client';
import { useEffect } from 'react';
import { getAuth } from '@/api/cookiesStore';

export default function Redirect() {
    useEffect(() => {
        if (!!getAuth()) window.location.replace('/');
        else window.location.replace('/auth');
    }, []);

    return <></>;
}