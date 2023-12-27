export function currencyTransform(price: number): string {
    const currency = new Intl.NumberFormat("zh-TW", {
        style: "decimal",
        minimumFractionDigits: "0"
    }).format(price);

    return `NT$ ${currency}`;
}
