import fs from "fs";
import path from "path";

/**
 * Class representing a file.
 * It is responsible to keep track of file path and hash
 */
export class File {
    private readonly _path: string;
    private readonly _hash: Buffer;

    constructor(bufferPath: string) {
        this._path = bufferPath;
        this._hash = fs.readFileSync(path.resolve(bufferPath));
    }

    /**
     * Get the path of the file
     * @return {string} the path of the file
     */
    getPath = (): string => this._path

    /**
     * Get the hash of the file
     * @return {Buffer} the hash of the file
     */
    getHash = (): Buffer => this._hash
}
