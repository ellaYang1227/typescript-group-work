export function daysDifference(checkInDate: string, checkOutDate: string): string {
    const checkInDateTime = newDateTransform(checkInDate).getTime();
    const checkOutDateTime = newDateTransform(checkOutDate).getTime();
    const timeDifference = Math.abs(checkOutDateTime - checkInDateTime);
    return `${Math.ceil(timeDifference / (1000 * 60 * 60 * 24))} 晚`;
}

export function dateTransform(date: string): string {
    const formatDate = newDateTransform(date).toLocaleDateString("zh-TW", { weekday: "long", month: "short", day: "numeric" });
    return formatDate.replace(" ", "");
}

const newDateTransform = (date: string): Date => new Date(date);
