export class Util {
    public static exec<T>(
        condition: boolean,
        successCallback: () => T,
        failCallback: () => T
    ): T {
        return condition ? successCallback() : failCallback();
    }
}
