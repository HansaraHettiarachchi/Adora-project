    import multer from 'multer';
    import fs from 'fs';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    export class FileUploader {
    private static baseDir = path.join(__dirname, '../../static/uploads');

    static async uploadFile(file: Express.Multer.File, filename: string): Promise<string> {
        const targetPath = path.join(FileUploader.baseDir, filename);
        const targetDir = path.dirname(targetPath);

        await fs.promises.mkdir(targetDir, { recursive: true });
        await fs.promises.rename(file.path, targetPath);

        // const urlPath = `/static/uploads/${filename.replace(/\\/g, '/')}`;
        const urlPath = `/static/${filename.replace(/\\/g, '/')}`;
        return urlPath;
    }

    static getMulter(): multer.Multer {
        return multer({
            dest: path.join(FileUploader.baseDir, 'temp'),
        });
    }


    static async deleteFile(filename: string): Promise<boolean> {
        const targetPath = path.join(FileUploader.baseDir, filename);
        try {
            await fs.promises.unlink(targetPath);
            return true;
        } catch (err) {
            // File not found or other error
            return false;
        }
    }
}
