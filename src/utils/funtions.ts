export function formatCardNumber (cardNumber: string ): string {
  return cardNumber.replace(/(.{4})/g, '$1 ').slice(0, -1);
}
