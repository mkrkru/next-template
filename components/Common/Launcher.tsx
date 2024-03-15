'use client';
import { useDispatch, useSelector } from '@/redux/hooks';
import { setIsLaptop } from "@/redux/miscSlice";
import { motion } from 'framer-motion';
import { ease } from "@/utils/misc";
import { useEffect } from "react";

export function Launcher() {
    const dispatch = useDispatch();
    const { isLaptop } = useSelector(({ misc }) => misc);

    useEffect(() => {
        function launch() {
            dispatch(setIsLaptop(!window.matchMedia("(max-width: 600px)").matches));
        }

        launch();
        window.onresize = launch;
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