/**
 * Format a number with commas and 2 decimal places
 * Example: 1234567.89 → "1,234,567.89"
 *          "30000" → "30,000.00"
 * 
 * @param {number|string} value - The number to format
 * @returns {string} Formatted number as string
 */
function formatNumber(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return "0.00";

    return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Example usage
// console.log(formatNumber(1234567.89));     // "1,234,567.89"
// console.log(formatNumber("30000"));        // "30,000.00"
// console.log(formatNumber("abc"));          // "0.00"

if (typeof module !== 'undefined') {
    module.exports = formatNumber;
}
