export default function getInitialsFullName(name: string, surname: string, patronymic: string): string {
    return `${surname} ${name?.at(0)}.${patronymic?.at(0)}.`;
}
