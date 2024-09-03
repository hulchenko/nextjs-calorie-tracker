export const passwordValidator = (password: string): boolean => {
    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm);
    return regex.test(password);
}