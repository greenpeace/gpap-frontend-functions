## Helper functions & CSS

These get published to NPM and from there to places like UNPKG, e.g. at https://unpkg.com/browse/@gp-australia-pacific/gpap-frontend-functions/

Once on the CDN, can be added to webpages directly.

Add the latest version of the helper scripts & CSS (e.g. in the HTML head section of Instapage):

```html
<script src="https://unpkg.com/@gp-australia-pacific/gpap-frontend-functions@latest"></script>
<link rel="stylesheet" href="https://unpkg.com/@gp-australia-pacific/gpap-frontend-functions@latest/dist/gp-donate.css">
```

## Examples

### Disclaimer toggler

In the JavaScript:

```javascript
  var recurringId = 'donate-disclaimer-rg';
  var oneOffId = 'donate-disclaimer-oo';
  var newFreq = donations.getToggler(oneOffId, recurringId);
```

In the HTML below the donate form:
```html
<div class="donate-disclaimer-container">
<p id="donate-disclaimer-oo" style="display:none;">
Your generous one-time gift will help fund our campaign.
</p>
<p id="donate-disclaimer-rg"  style="display:none;">
Your account will be debited today, then every subsequent 4 weeks. <a href="https://www.greenpeace.org.au/contact/">Get in touch with us to</a> arrange an alternative date.
</p>
</div>
```
