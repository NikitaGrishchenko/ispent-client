import { formatter } from 'boot/formatter';

export function useOperation() {
  const getStyleAmountForOperation = (amount: number, kind: number) => {
    if (kind === 1) {
      return `<span class="text-positive">+${formatter.format(amount)}</span>`;
    }
    return `-${formatter.format(amount)}`;
  };

  const getStyleAmountForTotalCategory = (amount: number, kind: number) => {
    if (kind === 1) {
      return `<span class="text-positive">+${formatter.format(amount)}</span>`;
    }
    return `${formatter.format(amount)}`;
  };

  return {
    getStyleAmountForOperation,
    getStyleAmountForTotalCategory,
  };
}
