import withPWA from 'next-pwa';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
})({
    reactStrictMode: true,
    output: 'standalone',
    transpilePackages: ['@mui/x-date-pickers'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'src')],
    },
    webpack: (config) => {
        config.resolve.extensionAlias = {
            '.js': ['.ts', '.tsx', '.js'],
            '.jsx': ['.tsx', '.jsx'],
        }
        return config
    }
})

export default config;
