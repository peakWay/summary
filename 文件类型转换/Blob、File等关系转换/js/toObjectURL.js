
/**
 * 
 * @param {File | Blob} file 
 */
function fileToObjectURL(file) {
    const  URL = window.URL ||  window.webkitURL;
    return URL.createObjectURL(file)
}