function mapValue(value, low1, high1, low2, high2) {
    var range1 = high1 - low1;
    var range2 = high2 - low2;
    return ((value - low1) / range1 * range2 + low2);
};