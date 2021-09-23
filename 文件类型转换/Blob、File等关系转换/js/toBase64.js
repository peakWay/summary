
function arrayBufferToBase64(buffer) {
    let str = '';
    const bytes =  new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
        str += String.fromCharCode(bytes[i])
    }
    return btoa(str);
}

function dataURLToBase64(url) {
    let arr = url.split(',');
    return arr[1];
}