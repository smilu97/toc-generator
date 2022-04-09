interface LevelTitle {
    level: number;
    title: string;
}

function countPriorChar(s: string, ch: string): number {
    const text = s.trimStart();
    for (let i = 0; i < text.length; i += 1) {
        if (text.charAt(i) != ch)
            return i;
    }
    return text.length;
}

function getLevel(s: string): number {
    return countPriorChar(s, '#');
}

function getTitle(s: string): string {
    const text = s.trimStart();
    const level = getLevel(text);
    return text.substring(level).trim();
}

function getTag(title: string): string {
    return title.toLowerCase().replaceAll(' ', '-');
}

function mapToLevelAndTitle(s: string): LevelTitle {
    const level = getLevel(s);
    const title = getTitle(s);
    return { level, title };
}

function mapToLine({level, title}: LevelTitle): string {
    const prior = ' '.repeat(level * 2);
    const tag = getTag(title);
    return `${prior}* [${title}](#${tag})`;
}

function countBackdashes(s: string): number {
    const r = countPriorChar(s, '`');
    if (r < 3)
        return 0;
    else
        return r;
}

function removeCodeBlocks(s: string): string[] {
    const lines = s
        .split('\n')
        .map(content => ({
            content,
            level: countBackdashes(content),
            del: false,
        }));

    let level = 0;
    for (let i = 0; i < lines.length; i += 1) {
        if (!level) {
            if (lines[i].level) {
                level = lines[i].level;
                lines[i].del = true;
            }
        } else {
            lines[i].del = true;
            if (lines[i].level >= level) {
                level = 0;
            }
        }
    }

    return lines
        .filter(el => !el.del)
        .map(el => el.content);
}

export default function convert(input: string) {
    return removeCodeBlocks(input)
        .map(mapToLevelAndTitle)
        .filter(el => el.level > 0)
        .map(mapToLine)
        .join('\n');
}
