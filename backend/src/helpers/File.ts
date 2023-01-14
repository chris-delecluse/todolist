import fs from "fs";
import path from "path";

export class File {
    private readonly _path: string
    private readonly _hash: Buffer

    constructor(bufferPath: string) {
        this._path = bufferPath;
        this._hash = fs.readFileSync(path.join(__dirname, bufferPath));
    }

    getPath = (): string => this._path

    getHash = (): Buffer => this._hash
}
