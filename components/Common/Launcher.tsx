'use client';
import { setIsLaptop } from "@/redux/miscSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from '@/redux/hooks';
import { motion } from 'framer-motion';
import { ease } from "@/utils/misc";

export function Launcher() {
    const dispatch = useDispatch();
    const { isLaptop } = useSelector(state => state.misc);

    useEffect(() => {
        dispatch(setIsLaptop(!window.matchMedia("(max-width: 600px)").matches));
    }, [dispatch]);

    return <>
        <motion.div
            style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 10000, background: 'black', pointerEvents: 'none' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: isLaptop === null ? 1 : 0 }}
            transition={{ duration: 0.3, ease }}
        />
    </>
}