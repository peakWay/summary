
/**
 * 
 * @param {File | Blob} file 
 */
function fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onerror = function(error) {
            reject(error)
        };

        reader.onload = function() {            
            resolve(reader.result)
        };
    })
}


function base64ToArrayBuffer(base64string)  {
    const padding = '='.repeat((4 - base64string.length % 4) % 4);
    const base64 = (base64string + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = atob(base64);
    const arraybuffer = new Uint8Array(rawData.length)

    for(let i = 0;i < rawData.length; i++) {
        arraybuffer[i] = rawData.charCodeAt(i);
    }

    return arraybuffer;
    
}

