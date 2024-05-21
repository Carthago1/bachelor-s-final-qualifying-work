const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export default function isEmailValid(email?: string): boolean {
    if (email) {
        return EMAIL_REGEXP.test(email);
    }

    return false;
}
