import crypto from 'crypto';
import Config from '../../utils/config';

export default class CryptoService {

    private static algorithm = 'aes-192-cbc';
    private static iv = '96539eed52ceb0ef068dca51d2cc80cc';
    private static key = crypto.scryptSync(Config.encryptionSecretKey, 'salt', 24);

    /** Handles encrypting the provided string
     * @params stringToEncrypt - The string to be encrypted
     */
    public static encrypt(stringToEncrypt: string): string {

        try {
            const cipher = crypto.createCipheriv(this.algorithm, this.key, Buffer.from(this.iv, 'hex'));
            const encryptedString = cipher.update(stringToEncrypt, 'utf8', 'hex') + cipher.final('hex');

            return encryptedString;
        }

        catch (error) {
            console.log(`An error occurred encrypting the string`, error);
            throw new Error(`Could not encrypt due to ${error}`);
        }
    }

    /** 
     * Decrypt string.
     * @param {string} encryptedString - The string to be decrypted
     */
    public static decrypt(encryptedString: string): string {

        try {
            const bufferText = Buffer.from(encryptedString, 'hex');
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(this.iv, 'hex'));
            let decrypted = decipher.update(bufferText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            return decrypted.toString();

        } catch (e) {
            console.log(`Could not decrypt due to ${e}`);
            throw new Error(`Could not decrypt due to ${e}`);
        }
    }
}