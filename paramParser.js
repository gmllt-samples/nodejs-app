function parseParam(input, type = 'int', defaultValue = 0) {
    const parts = input.split(',');
    let values = [];

    parts.forEach(part => {
        if (part.includes('-')) {
            const [startRaw, endRaw] = part.split('-');
            const start = convert(startRaw.trim(), type);
            const end = convert(endRaw.trim(), type);
            for (let i = start; i <= end; i++) values.push(i);
        } else {
            values.push(convert(part.trim(), type));
        }
    });

    if (values.length === 0) return defaultValue;
    const choice = values[Math.floor(Math.random() * values.length)];
    return choice;
}

function convert(raw, type) {
    raw = raw.toUpperCase();
    let multiplier = 1;

    if (raw.endsWith('K')) {
        multiplier = 1024;
        raw = raw.replace('K', '');
    } else if (raw.endsWith('M')) {
        multiplier = 1024 * 1024;
        raw = raw.replace('M', '');
    } else if (raw.endsWith('G')) {
        multiplier = 1024 * 1024 * 1024;
        raw = raw.replace('G', '');
    }

    const num = parseFloat(raw) * multiplier;
    return type === 'float' ? parseFloat(num) : parseInt(num);
}

module.exports = { parseParam };
