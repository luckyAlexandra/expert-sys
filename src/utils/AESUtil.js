import CryptoJs from 'crypto-js'
const AESKEY = "BOX-SHOP-QRCODE$"
export default class AESUtil {
  /**
   * 加密
   */
  static encrypt(word) {
    let key = CryptoJs.enc.Utf8.parse(AESKEY);
    let srcs = CryptoJs.enc.Utf8.parse(word);
    let encrypted = CryptoJs.AES.encrypt(srcs, key, {
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7
    });
    return encrypted.toString();
  }

  /**
   * 解密
   */
  static decrypt(word) {
    let key = CryptoJs.enc.Utf8.parse(AESKEY);
    let decrypt = CryptoJs.AES.decrypt(word, key, {
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7
    });
    return CryptoJs.enc.Utf8.stringify(decrypt).toString();
  }
}
