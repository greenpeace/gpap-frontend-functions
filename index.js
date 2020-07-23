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
