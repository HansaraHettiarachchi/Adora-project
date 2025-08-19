import multer from 'multer';
export declare class FileUploader {
    private static baseDir;
    static uploadFile(file: Express.Multer.File, filename: string): Promise<string>;
    static getMulter(): multer.Multer;
    static deleteFile(filename: string): Promise<boolean>;
}
//# sourceMappingURL=FileUploader.d.ts.map