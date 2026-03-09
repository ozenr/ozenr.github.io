import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
        input: {
            // Vite looks at the root for these files
            main: resolve(__dirname, 'index.html'),
            cards: resolve(__dirname, 'cards.html'),
        },
        },
    },
})