
/**
 * 
 * @param {File | Blob} file
 * @returns {Promise<T>} 
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

    const rawData = window.atob(base64);
    let arraybuffer = new Uint8Array(rawData.length)
    console.log(rawData);

    for(let i = 0;i < rawData.length; i++) {
        arraybuffer[i] = rawData.charCodeAt(i);
    }

    return arraybuffer;
    
}
