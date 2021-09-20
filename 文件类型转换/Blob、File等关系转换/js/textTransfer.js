/**
 * 
 * @param {Uint8Array} buffer
 * @returns {string} text
 */

function decodeText(buffer) {
    const textDecorder = new TextDecoder();

    return textDecorder.decode(buffer);
}