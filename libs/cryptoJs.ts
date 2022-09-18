import CryptoJS from 'crypto-js'

export const genHexString = (n: number) => {
    return CryptoJS.lib.WordArray.random(n).toString() // generate n random bytes and convert them to a hex string (len = n * 2)
}

export const hash = (plainText: string) => {
    return CryptoJS.SHA256(plainText).toString(CryptoJS.enc.Hex)
}

export const encrypt = (plainText: string) => {
    const salt = CryptoJS.lib.WordArray.random(16) // generate 16 random bytes and convert them to a hex string (len = 16 * 2)

    // PBKDF2 key derivation using salt: https://cryptojs.gitbook.io/docs/#pbkdf2
    // 256 bit = 32 byte hex = len 64 string
    const key = CryptoJS.PBKDF2(process.env.AES_KEY as string, salt, {
        keySize: 256 / 32,
        iterations: 100,
    })

    const iv = CryptoJS.lib.WordArray.random(16) // generate 16 random bytes and convert them to a hex string (len = 16 * 2)

    // encrypt using the derived key and iv
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })

    // len: 32 + 32 + n (n: based on input, max 64)
    return salt.toString() + iv.toString() + encrypted.toString()
}

export const decrypt = (cipherText: string) => {
    // get salt (first 32 chars)
    const salt = CryptoJS.enc.Hex.parse(cipherText.substring(0, 32))

    // get iv (next 32 chars)
    const iv = CryptoJS.enc.Hex.parse(cipherText.substring(32, 64))

    // get remaining chars
    const encrypted = cipherText.substring(64)

    // PBKDF2 key derivation using salt: https://cryptojs.gitbook.io/docs/#pbkdf2
    // 256 bit = 32 byte hex = len 64 string
    const key = CryptoJS.PBKDF2(process.env.AES_KEY as string, salt, {
        keySize: 256 / 32,
        iterations: 100,
    })

    // decrypt using the derived key and iv
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })

    // convert to utf-8
    return decrypted.toString(CryptoJS.enc.Utf8)
}
