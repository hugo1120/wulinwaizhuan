import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFRAMES_DIR = path.resolve(__dirname, '../../keyframes');
const OUTPUT_FILE = path.resolve(__dirname, '../public/data.json');

async function generateIndex() {
    console.log(`Scanning ${KEYFRAMES_DIR}...`);

    if (!fs.existsSync(KEYFRAMES_DIR)) {
        console.error(`Error: Keyframes directory not found at ${KEYFRAMES_DIR}`);
        process.exit(1);
    }

    const index = [];
    const episodes = fs.readdirSync(KEYFRAMES_DIR).filter(item => {
        return fs.statSync(path.join(KEYFRAMES_DIR, item)).isDirectory();
    });

    for (const ep of episodes) {
        const epDir = path.join(KEYFRAMES_DIR, ep);
        const files = fs.readdirSync(epDir).filter(f => f.endsWith('.jpg'));

        for (const file of files) {
            // Filename format: 01_0012_text.jpg
            const match = file.match(/^(\d+)_(\d+)_(.+)\.jpg$/);

            if (match) {
                const [_, episode, secondsStr, textRaw] = match;
                const seconds = parseInt(secondsStr, 10);
                const text = textRaw.replace(/_/g, ' ');

                index.push({
                    p: `${ep}/${file}`, // relative path
                    t: text,
                    e: episode,
                    s: seconds
                });
            }
        }
    }

    console.log(`Found ${index.length} images.`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index));
    console.log(`Index written to ${OUTPUT_FILE}`);
}

generateIndex();
