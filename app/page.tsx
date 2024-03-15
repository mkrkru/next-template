'use client';
import getLayout from '@/layouts';
import { useSelector } from '@/redux/hooks';

export default function Home() {
  const { isLaptop } = useSelector(({ misc }) => misc);
  const Layout = getLayout(isLaptop ? 'laptop' : 'phone');

  return <Layout />
}