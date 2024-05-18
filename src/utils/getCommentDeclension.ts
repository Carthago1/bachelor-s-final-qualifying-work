export default function getCommentDeclension(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${count} комментариев`;
    } else if (lastDigit === 1) {
        return `${count} комментарий`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} комментария`;
    } else {
        return `${count} комментариев`;
    }
}
