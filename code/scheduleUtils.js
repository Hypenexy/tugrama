// scheduleUtils.js
// Small helpers to parse and efficiently query the `programa` object in
// `razpisaniq/2kurs4potok.js` without changing the original file.
//
// Exports:
// - parseRange(str): turn "2-4" or "3" or "all" or "2-4,6" into an array of numbers or null for "all"
// - normalizeProgram(program): returns an array of event objects { day, subject, type, room, weeks, hours, groups }
// - getEventsForWeek(program, week): returns events active in that week
// - getEventsForDayWeek(program, day, week): events for a specific day+week

const cache = new WeakMap(); // program object -> normalized events

function toNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// parse a range string like "2-4", "2-4,6,8-9", "all" or a number or array
function parseRange(value) {
    if (value === undefined || value === null) return null;
    if (Array.isArray(value)) return value.map(toNumber).filter(x => x !== null);
    if (typeof value === 'number') return [value];
    if (typeof value !== 'string') return null;

    const s = value.trim().toLowerCase();
    if (!s) return null;
    if (s === 'all') return null; // null === all (don't filter by range)

    // allow separators "," and ";" and whitespace
    const parts = s.split(/[,;\s]+/).filter(Boolean);
    const out = new Set();
    for (const p of parts) {
        if (p.includes('-')) {
            const [aStr, bStr] = p.split('-').map(x => x.trim());
            const a = toNumber(aStr);
            const b = toNumber(bStr);
            if (a !== null && b !== null) {
                const start = Math.min(a,b);
                const end = Math.max(a,b);
                for (let i = start; i <= end; i++) out.add(i);
            }
        } else {
            const n = toNumber(p);
            if (n !== null) out.add(n);
        }
    }

    return Array.from(out).sort((a,b)=>a-b);
}

// parse groups: accepts "all" (returns null), number, array, string ranges
function parseGroups(value) {
    if (value === undefined || value === null) return null;
    if (value === 'all') return null;
    // sometimes groups are provided as a string like "4-6" or "5-6" or "4-6" with spaces
    return parseRange(value);
}

// parse hours: similar to parseRange but keep them as indexes (numbers)
function parseHours(value) {
    return parseRange(value);
}

// normalize single entry: returns array of normalized event(s)
function normalizeEntry(dayIdx, subject, entry, meta) {
    // entry can be an object or array of objects (file often used arrays in values)
    const entries = Array.isArray(entry) ? entry : [entry];
    const out = [];
    for (const e of entries) {
        // keep original fields but expand ranges
        const weeks = parseRange(e.weeks ?? e.week ?? e.weeks);
        const hours = parseHours(e.hours ?? e.hour);
        const groups = parseGroups(e.groups ?? e.group);
        out.push({
            day: Number(dayIdx),
            subject,
            type: e.type,
            room: e.room,
            raw: e, // keep raw reference
            weeks, // null means "all"
            hours, // array of hour indices (1-based) or null for all
            groups
        });
    }
    return out;
}

// normalize whole program into array of events; result cached for program object
function normalizeProgram(program) {
    if (!program || typeof program !== 'object') return [];
    if (cache.has(program)) return cache.get(program);

    const events = [];
    // meta may be at program.meta
    const meta = program.meta || {};

    for (const dayKey of Object.keys(program)) {
        if (dayKey === 'meta') continue;
        const dayBlock = program[dayKey];
        if (!dayBlock || typeof dayBlock !== 'object') continue;
        for (const subject of Object.keys(dayBlock)) {
            const entry = dayBlock[subject];
            // entry may be array or object or array of objects
            // Normalize
            const normalized = normalizeEntry(dayKey, subject, entry, meta);
            for (const n of normalized) events.push(n);
        }
    }

    cache.set(program, events);
    return events;
}

// get events active in a particular week (1-based week number)
function getEventsForWeek(program, weekNumber) {
    const events = normalizeProgram(program);
    if (weekNumber === undefined || weekNumber === null) return events;
    return events.filter(ev => {
        if (!ev.weeks) return true; // all weeks
        return ev.weeks.includes(Number(weekNumber));
    });
}

// get events for day (1-7) and week
function getEventsForDayWeek(program, day, weekNumber) {
    const evs = getEventsForWeek(program, weekNumber);
    return evs.filter(ev => Number(ev.day) === Number(day));
}

// convenience: map hour indices to times using program.meta.times (array of strings)
function hourIndexToTime(program, hourIndex) {
    const times = program && program.meta && program.meta.times;
    if (!Array.isArray(times)) return null;
    // hourIndex is 1-based
    const idx = Number(hourIndex) - 1;
    if (idx < 0 || idx >= times.length) return null;
    return times[idx];
}

module.exports = {
    parseRange,
    parseGroups,
    parseHours,
    normalizeProgram,
    getEventsForWeek,
    getEventsForDayWeek,
    hourIndexToTime
};
