export function findAMatch(list: string[], match: string): string | null {
    for (let i: number = 0; i < list.length; i++) {
        if (list[i].includes(match)) {
            return list[i]
        }
    }
    return null;
};
