/** Get donation info from donate redirect URL parameters.
 * This is designed for compatibility with GPAP donation pages.
 * @return {DonationInfoObject}
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

/**
 * <strong>SIDE EFFECT</strong>: We add to a global:
 * `document.donationInfo` is set to be a {@link DonationInfoObject}.
 *
 * This is meant as a convenience to users, so the {@link getInfo}
 * function need not be invoked directly. This is safe, since by the
 * time we execute, the URL params are already set.
 *
 * @example
 * ```
 * var firstName = document.donationInfo.firstname;
 * ```
 * @global
 **/
document.donationInfo = getInfo();

/** Get the gift type based on info from the URL parameters.
 * @see getInfo() to get the full donation info.
 * @return {string} 'donation' | 'regular donation'
 */
export function getType() {
  const url = new window.URL(window.location.href);
  const recurring = url.searchParams.get('recurring') === 'true';

  if (recurring) {
    return 'regular donation';
  }
  return 'donation';
}


/**
 * Information about a donation.
 * @typedef {Object} DonationInfoObject
 * @property {string} amount
 * @property {string} firstName
 * @property {boolean} recurring
 * @property {Object} meta
 * @property {Object} transaction - info about the transaction
 * @property {string} transaction.id
 **/

