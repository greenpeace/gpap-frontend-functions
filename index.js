/** Get donation info from donate redirect URL parameters.
 * This is designed for compatibility with GPAP donation pages.
 * @return { amount, firstName, recurring, meta, transaction: { id }}
 */
export function getDonationInfo() {
  const url = new window.URL(window.location.href);
  return {
    amount: url.searchParams.get('amount'),
    firstName: url.searchParams.get('firstName'),
    recurring: url.searchParams.get('recurring') === 'true',
    meta: JSON.parse(decodeURIComponent(url.searchParams.get('meta')) || null),
    transaction: {
      id: url.searchParams.get('transactionId'),
    },
  };
}

/** Get the gift type based on info from the URL parameters.
 * @see getDonationInfo()
 * @return 'donation' | 'regular donation'
 */
export function getGiftType() {
  const url = new window.URL(window.location.href);
  const recurring = url.searchParams.get('recurring') === 'true';

  if (recurring) {
    return 'regular donation';
  }
  return 'donation';
}
