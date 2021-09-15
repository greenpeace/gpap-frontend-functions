## Helper functions & CSS

These get published to NPM and from there to places like UNPKG, e.g. at https://unpkg.com/browse/@gp-australia-pacific/gpap-frontend-functions/

Once on the CDN, can be added to webpages directly.

Add the latest version of the helper scripts & CSS (e.g. in the HTML head):

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
  <div class="donate-disclaimer-container gp-text-slate">
    <p id="donate-disclaimer-oo" class="gp-hidden">
      Your generous one-time gift helps fund our campaigns for a better and greener future.
    </p>
    <p id="donate-disclaimer-rg" class="gp-hidden">
      Your account will be debited today, then every subsequent 4 weeks. <a href="https://www.greenpeace.org.au/contact/">Get in touch with us to</a> arrange an alternative date.
    </p>
  </div>
```

## Documentation

View it [online here](https://github.io/greenpeace/gpap-frontend-functions) or locally via `yarn docs:serve`.

Generate it:
```
yarn global add documentation
yarn docs:build
open docs/index.html
```

Publish it:
```
yarn docs:publish
```
