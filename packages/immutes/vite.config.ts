import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        dts({
            tsconfigPath: './tsconfig.build.json',
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'main.ts'),
            name: 'main',
            // the proper extensions will be added
            fileName: 'main',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['mutative'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    mutative: 'Mutative',
                },
            },
        },
        // Generate sourcemaps
        sourcemap: true,
        // Clean output directory
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '~list': resolve(__dirname, 'src/list'),
            '~hash': resolve(__dirname, 'src/hash'),
        },
    },
    // test: {
    //     include: ['src/**/*.test.ts'],
    //     exclude: ['**/*.int.test.ts'],
    // },
});
