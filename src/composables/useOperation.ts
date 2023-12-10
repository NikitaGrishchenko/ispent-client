export function useOperation() {
  const getStyleAmountForOperation = (amount: number, kind: number) => {
    if (kind === 1) {
      return `<span class="text-positive">+${amount} <span class="sign-ruble">₽</span></span>`;
    }
    return `-${amount} <span class="sign-ruble">₽</span>`;
  };

  const getStyleAmountForTotalCategory = (amount: number, kind: number) => {
    if (kind === 1) {
      return `<span class="text-positive">+${amount} <span class="sign-ruble">₽</span></span>`;
    }
    return `${amount} <span class="sign-ruble">₽</span>`;
  };

  return {
    getStyleAmountForOperation,
    getStyleAmountForTotalCategory,
  };
}
