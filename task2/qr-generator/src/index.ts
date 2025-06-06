import * as qrcode from 'qrcode';
import * as process from 'process';

interface CliArgs {
    command: string;
    text?: string;
    size?: number;
}

function parseArgs(args: string[]): CliArgs {
    const result: CliArgs = { command: args[0] };

    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--size' && i + 1 < args.length) {
            result.size = parseInt(args[i + 1], 10);
            i++;
        } else if (!result.text && args[i] !== '--size') {
            result.text = args[i];
        }
    }

    return result;
}

async function generateQR(text: string, size: number = 4) {
    try {
        const qrCode = await qrcode.toString(text, {
            type: 'terminal',
            width: size,
            margin: 1,
            color: {
                dark: '#000',
                light: '#fff'
            }
        });

        console.log(qrCode);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка при генерации QR-кода:', error.message);
        } else {
            console.error('Неизвестная ошибка при генерации QR-кода');
        }
        process.exit(1);
    }
}

async function main() {
    const args = parseArgs(process.argv.slice(2));

    if (args.command !== 'generate') {
        console.log('Использование: npm start -- generate "<text>" [--size <number>]');
        return;
    }

    if (!args.text) {
        console.error('Ошибка: Укажите текст или ссылку');
        process.exit(1);
    }

    await generateQR(args.text, args.size);
}

main().catch(console.error);