import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                100: { value: '#000000' }
            }
        }
    },
});
