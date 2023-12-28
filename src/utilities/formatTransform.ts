/**
 * 貨幣轉換
 * @param price 要轉換的價錢
 * @returns e.g.=> NT$ 1000
 */
export function currencyTransform(price: number): string {
    const currency = new Intl.NumberFormat("zh-TW", {
        style: "decimal",
        minimumFractionDigits: "0"
    }).format(price);

    return `NT$ ${currency}`;
}
