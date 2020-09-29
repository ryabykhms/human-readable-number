function getUnitsReadable(strNumber) {
    const units = {
        0: "",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
    };
    const decimalUnits = {
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        15: "fifteen",
        18: "eighteen",
        2: "twenty",
        3: "thirty",
        4: "forty",
        5: "fifty",
        6: "sixty",
        7: "seventy",
        8: "eighty",
        9: "ninety",
        0: "",
    };
    if (strNumber.length === 1) {
        return units[strNumber];
    }
    if (strNumber.length === 2) {
        if (decimalUnits[strNumber] === undefined) {
            const firstNumber = strNumber.charAt(0);
            const lastNumber = strNumber.charAt(1);
            if (firstNumber === "1") {
                return `${units[lastNumber]}teen`;
            } else {
                return `${decimalUnits[firstNumber]} ${units[lastNumber]}`;
            }
        }
        return decimalUnits[strNumber];
    }

    if (strNumber.length === 3) {
        const firstNumber = strNumber.charAt(0);
        const lastNumbers = strNumber.slice(1);
        return `${units[firstNumber]} hundred ${getUnitsReadable(lastNumbers)}`;
    }
}

function getReadable(numberRanks) {
    const ranks = {
        1: "",
        2: "thousand",
        3: "million",
        4: "billion",
        5: "trillion",
    };
    const count = numberRanks.length;
    return `${getUnitsReadable(numberRanks[0])} ${ranks[count]} ${
        count > 1 ? getReadable(numberRanks.slice(1)) : ""
    }`;
}

module.exports = function toReadable(number) {
    if (number === 0) {
        return "zero";
    } else {
        const numberRanks = number
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            .split(" ");
        return getReadable(numberRanks).replace(/\s+/g, " ").trim();
    }
};
