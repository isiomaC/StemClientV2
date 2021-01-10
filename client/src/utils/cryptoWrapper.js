import CryptoJS from 'crypto-js'

export const encrypt = (data) => {

    let toEncrypt 

    if (typeof(data) === "object" && data !== null){
        toEncrypt = JSON.stringify(data)
    }else{
        toEncrypt = data
    }

    return CryptoJS.AES.encrypt(toEncrypt, process.env.REACT_APP_SECRET,
     {
        keySize: 128 / 8,
        iv: process.env.REACT_APP_SECRET,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
}



