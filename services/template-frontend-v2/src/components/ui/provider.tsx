'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
import { system } from '@/app/system';
import { ReduxProvider } from '@/redux/provider';

export function Provider(props: React.PropsWithChildren) {
    return <ReduxProvider>
        <ChakraProvider value={system}>
            <ColorModeProvider>{props.children}</ColorModeProvider>
        </ChakraProvider>
    </ReduxProvider>;
}
