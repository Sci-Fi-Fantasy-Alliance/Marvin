export class TimeUtils {
    /**
     * sleep
     *
     */
    static sleep(time: number): Promise<unknown> {
        return new Promise(res => setTimeout(res, time));
    }
}
