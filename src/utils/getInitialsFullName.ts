export default function getInitialsFullName(name: string, surname: string, patronymic: string): string {
    return `${surname} ${name[0]}.${patronymic[0]}.`;
}
