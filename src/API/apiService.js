// apiService.js
export const fetchReadmeAndParseIcons = async (repo) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/readme`);
        const data = await response.json();
        const readmeContent = atob(data.content);
        return parseIconListFromReadme(readmeContent);
    } catch (error) {
        console.error('Error fetching README:', error);
        return [];
    }
    };

const parseIconListFromReadme = (readmeContent) => {
    const iconList = [];
    const lines = readmeContent.split('\n');
    const iconListStartIndex = lines.findIndex(line => line.trim() === '|      Icon ID       |                         Icon                          |');
    const iconListEndIndex = lines.findIndex(line => line.trim() === '---', iconListStartIndex + 1);

    for (let i = iconListStartIndex + 2; i < iconListEndIndex; i++) {
        const line = lines[i];
        const match = line.match(/\|\s*`([^`]+)`\s*\|\s*<img src="([^"]+)" width="48">\s*\|/);
        if (match) {
            // 여기에서 첫 번째 값을 무시합니다.
            const [, iconId, iconSrc] = match;
            iconList.push({ iconId, iconSrc: iconSrc.replace('../icons/', '/path/to/icons/') });
        }
    }   

    return iconList;
};