/**
 * 計算住宿幾晚
 * @param checkInDate 入住日期
 * @param checkOutDate 退房日期
 * @param isOnlyNumber (非必要值)僅回傳數值；預設為 false
 * @return e.g.=> isOnlyNumber: true 為 1；反之則為 1 晚
 */
export function daysDifference(
    checkInDate: Date | string,
    checkOutDate: Date | string,
    isOnlyNumber?: boolean
): string | number {
    const checkInDateTime = newDateTransform(checkInDate).getTime();
    const checkOutDateTime = newDateTransform(checkOutDate).getTime();
    const timeDifference = Math.abs(checkOutDateTime - checkInDateTime);
    let value = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (isNaN(value)) {
        value = 0;
    }
    return isOnlyNumber ? value : `${value} 晚`;
}

/**
 * 日期轉換(月、日、星期)
 * @param date 要轉換的日期
 * @return e.g.=> 12 月 28 日星期四
 */
export function dateTransform(date: Date | string): string {
    const formatDate = newDateTransform(date).toLocaleDateString("zh-TW", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });
    return formatDate.replace(/(\d{1,2})月(\d{1,2})日 (.+)/, "$1 月 $2 日$3");
}

/**
 * 取得當前日期和時間的 Date 物件
 * @param date 日期參數
 * @returns e.g.=> Sun Jun 18 2023 08:00:00 GMT+0800 (台北標準時間)
 */
const newDateTransform = (date: Date | string): Date => new Date(date);
