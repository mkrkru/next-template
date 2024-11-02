'use client';

import { VStack, Button, Text } from '@chakra-ui/react';
import { useColorMode } from '@/components/ui/color-mode';

export default function Home() {
    const theme = useColorMode();
    return <VStack>
        <Text>{theme.colorMode}</Text>

        <Button colorPalette='orange' onClick={theme.toggleColorMode}>123</Button>
    </VStack>;
}
