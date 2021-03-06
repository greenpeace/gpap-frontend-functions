/** Get donation info from donate redirect URL parameters.
 * This is designed for compatibility with GPAP donation pages.
 * @return { amount, firstName, recurring, meta, transaction: { id }}
 */
export function getInfo() {
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

// SIDE EFFECT:
// As a convenience to users, we add to the document so the function need not be
// invoked directly. This is safe, since by the time we execute, the URL params
// are already set.
document.donationInfo = getInfo();

/** Get the gift type based on info from the URL parameters.
 * @see getGift()
 * @return 'donation' | 'regular donation'
 */
export function getType() {
  const url = new window.URL(window.location.href);
  const recurring = url.searchParams.get('recurring') === 'true';

  if (recurring) {
    return 'regular donation';
  }
  return 'donation';
}
