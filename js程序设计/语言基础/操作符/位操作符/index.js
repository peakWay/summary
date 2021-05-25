
/**
 * 位操作符的尝试应用
 * 1.判断是否是8的正倍数
 */

function is8Multiple(num) {
    if (!num) return false;

    return (num & 7) == 0
}

