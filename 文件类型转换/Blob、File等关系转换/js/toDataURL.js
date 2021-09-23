

/**
 * 
 * @param {File | Blob} file 
 */
function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const read = new FileReader();
        read.readAsDataURL(file);

        read.onerror = (err) => {
            reject(err);
        }

        read.onload = () => {
            resolve(read.result)
        }
    })
}