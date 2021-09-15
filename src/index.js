/** Get donation info from donate redirect URL parameters.
 * This is designed for compatibility with GPAP donation pages.
 *
 * Rather than calling this function, you can just use the global
 * {@link #donationinfo `document.donationInfo`}.
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
 * var firstName = document.donationInfo.firstName;
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


/** Returns the jQuery lib (or a simple mock)
 * @private
 */
function getJQ() {
  var func = 'function';
  if (typeof ijQuery === func) {
    // Instapage jQuery
    return ijQuery;
  } else if (typeof jQuery === func) {
    return jQuery;
  } else {
    return function (f) {
      // If no jquery, we just run immediately.
      f();
    }
  }
}

/** Gets a frequency toggler function.
 *
 * @param {string} oneOffId - the ID of a `<div>` to be shown when the frequency is one-off.
 * @param {string} recurringId - the ID of a `<div>` to be shown when the frequency is recurring.
 * @return {Function} whose name can be passed as the `frequency-hook` to the donation element.
 */
export function getToggler(oneOffId, recurringId) {
  if (!oneOffId || !recurringId) {
    return function() {}; // no-op
  }

  return function toggler(frequency) {
    var anyJQ = getJQ();
    anyJQ(function () {
      // Save the recurring gift disclaimer node
      var recurringMessage = document.getElementById(recurringId);
      var oneoffMessage = document.getElementById(oneOffId);

      console.log('new donation frequency: ', frequency);
      if (!oneoffMessage || !recurringMessage) {
        console.warn('Missing disclaimer(s) after frequency change');
        return;
      }

      // Toggle which disclaimer is shown. `frequency` is `once` or `recurring`
      if (frequency === 'once') {
        recurringMessage.style.display = 'none';
        oneoffMessage.style.display = 'block';
      } else if (frequency === 'recurring') {
        oneoffMessage.style.display = 'none';
        recurringMessage.style.display = 'block';
      }
    });
 }
}
