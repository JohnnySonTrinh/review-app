# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.

Welcome to the Star Review testing results, in this file you will see how each and every element and features tested to ensure each features worked as intended.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File       | Screenshot                                             | Notes            |
| --------- | ---------- | ------------------------------------------------------ | ---------------- |
| public    | index.html | ![screenshot](documentation/validation/html-index.png) | Bad Value Errors |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Directory | File                            | Screenshot                                                           | Notes                   |
| --------- | ------------------------------- | -------------------------------------------------------------------- | ----------------------- |
| src       | App.module.css                  | ![screenshot](documentation/validation/css-app.png)                  | No errors, Warnings(13) |
| src       | index.css                       | ![screenshot](documentation/validation/css-index.png)                | No errors, Warnings(3)  |
| src       | Asset.module.css                | ![screenshot](documentation/validation/css-asset.png)                | No Error Found!         |
| src       | Avatar.module.css               | ![screenshot](documentation/validation/css-avatar.png)               | No Error Found!         |
| src       | Button.module.css               | ![screenshot](documentation/validation/css-button.png)               | No errors, Warnings(17) |
| src       | MoreDropdown.module.css         | ![screenshot](documentation/validation/css-moredropdown.png)         | No Error Found!         |
| src       | NavBar.module.css               | ![screenshot](documentation/validation/css-navbar.png)               | No errors, Warnings(4)  |
| src       | Note.module.css                 | ![screenshot](documentation/validation/css-note.png)                 | No errors, Warnings(2)  |
| src       | NoteCreateEditForm.module.css   | ![screenshot](documentation/validation/css-notecreateeditform.png)   | No errors, Warnings(6)  |
| src       | Profile.module.css              | ![screenshot](documentation/validation/css-profile.png)              | No Error Found!         |
| src       | ProfilePage.module.css          | ![screenshot](documentation/validation/css-profilepage.png)          | No Error Found!         |
| src       | Review.module.css               | ![screenshot](documentation/validation/css-review.png)               | No errors, Warnings(8)  |
| src       | ReviewCreateEditForm.module.css | ![screenshot](documentation/validation/css-reviewcreateeditform.png) | No errors, Warnings(6)  |
| src       | ReviewsPage.module.css          | ![screenshot](documentation/validation/css-reviewspage.png)          | No errors, Warnings(8)  |
| src       | SignInUpForm.module.css         | ![screenshot](documentation/validation/css-signinupform.png)         | No errors, Warnings(5)  |

### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

I used this command before pasting the code **/_ jshint esversion: 11, asi: true _/** for ES6 warnings.

| Directory          | File                     | Screenshot                                                               | Notes        |
| ------------------ | ------------------------ | ------------------------------------------------------------------------ | ------------ |
| src                | App.js                   | ![screenshot](documentation/validation/jshint-app.png)                   | Warnings(2)  |
| src/api            | axiosDefaults.js         | ![screenshot](documentation/validation/jshint-axiosdefaults.png)         | Pass         |
| src/components     | Asset.js                 | ![screenshot](documentation/validation/jshint-asset.png)                 | Warnings(2)  |
| src/components     | Avatar.js                | ![screenshot](documentation/validation/jshint-avatar.png)                | Warnings(2)  |
| src/components     | MoreDropdown.js          | ![screenshot](documentation/validation/jshint-moredropdown.png)          | Warnings(13) |
| src/components     | NavBar.js                | ![screenshot](documentation/validation/jshint-navbar.png)                | Warnings(2)  |
| src/components     | NotFound.js              | ![screenshot](documentation/validation/jshint-notfound.png)              | Warnings(2)  |
| src/contexts       | CurrentUserContext.js    | ![screenshot](documentation/validation/jshint-currentusercontext.png)    | Warnings(3)  |
| src/contexts       | ProfileDataContext.js    | ![screenshot](documentation/validation/jshint-profiledatacontext.png)    | Warnings(2)  |
| src/hooks          | useClickOutsideToggle.js | ![screenshot](documentation/validation/jshint-useclickoutsidetoggle.png) | Pass         |
| src/hooks          | useRedirect.js           | ![screenshot](documentation/validation/jshint-useredirect.png)           | Pass         |
| src                | index.js                 | ![screenshot](documentation/validation/jshint-index.png)                 | Warnings(4)  |
| src/page/auth      | SignInForm.js            | ![screenshot](documentation/validation/jshint-signinform.png)            | Warnings(2)  |
| src/page/auth      | SignUpForm.js            | ![screenshot](documentation/validation/jshint-signupform.png)            | Warnings(2)  |
| src/pages/notes    | Note.js                  | ![screenshot](documentation/validation/jshint-note.png)                  | Warnings(2)  |
| src/pages/notes    | NoteCreateForm.js        | ![screenshot](documentation/validation/jshint-notecreateform.png)        | Warnings(2)  |
| src/pages/notes    | NoteEditForm.js          | ![screenshot](documentation/validation/jshint-noteeditform.png)          | Warnings(3)  |
| src/pages/profiles | PopularProfiles.js       | ![screenshot](documentation/validation/jshint-popularprofiles.png)       | Warnings(2)  |
| src/pages/profiles | Profile.js               | ![screenshot](documentation/validation/jshint-profile.png)               | Warnings(2)  |
| src/pages/profiles | ProfileEditForm.js       | ![screenshot](documentation/validation/jshint-profileeditform.png)       | Warnings(2)  |
| src/pages/profiles | ProfilePage.js           | ![screenshot](documentation/validation/jshint-profilepage.png)           | Warnings(2)  |
| src/pages/profiles | UsernameForm.js          | ![screenshot](documentation/validation/jshint-usernameform.png)          | Warnings(2)  |
| src/pages/profiles | UserPasswordForm.js      | ![screenshot](documentation/validation/jshint-userpasswordform.png)      | Warnings(2)  |
| src/pages/reviews  | Review.js                | ![screenshot](documentation/validation/jshint-review.png)                | Warnings(4)  |
| src/pages/reviews  | ReviewCreateForm.js      | ![screenshot](documentation/validation/jshint-reviewcreateform.png)      | Warnings(2)  |
| src/pages/reviews  | ReviewEditForm.js        | ![screenshot](documentation/validation/jshint-revieweditform.png)        | Warnings(2)  |
| src/pages/reviews  | ReviewPage.js            | ![screenshot](documentation/validation/jshint-reivewpage.png)            | Warnings(2)  |
| src/pages/reviews  | ReviewsPage.js           | ![screenshot](documentation/validation/jshint-reviewspage.png)           | Warnings(2)  |
| src/utils          | utils.js                 | ![screenshot](documentation/validation/jshint-utils.png)                 | Warnings(5)  |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser  | Home                                                   | Profile                                                   | Review                                                   | SignIn                                                   | Create Review                                                  | Notes               |
| -------- | ------------------------------------------------------ | --------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- | ------------------- |
| Chrome   | ![screenshot](documentation/browsers/chrome-home.png)  | ![screenshot](documentation/browsers/chrome-profile.png)  | ![screenshot](documentation/browsers/chrome-review.png)  | ![screenshot](documentation/browsers/chrome-signin.png)  | ![screenshot](documentation/browsers/chrome-createreview.png)  | Works as expected   |
| FireFox  | ![screenshot](documentation/browsers/firefox-home.png) | ![screenshot](documentation/browsers/firefox-profile.png) | ![screenshot](documentation/browsers/firefox-review.png) | ![screenshot](documentation/browsers/firefox-signin.png) | ![screenshot](documentation/browsers/firefox-createreview.png) | Works as expected   |
| Opera GX | ![screenshot](documentation/browsers/operagx-home.png) | ![screenshot](documentation/browsers/operagx-profile.png) | ![screenshot](documentation/browsers/operagx-review.png) | ![screenshot](documentation/browsers/operagx-signin.png) | ![screenshot](documentation/browsers/operagx-createreview.png) | Works as expected   |
| Edge     | ![screenshot](documentation/browsers/edge-home.png)    | ![screenshot](documentation/browsers/edge-profile.png)    | ![screenshot](documentation/browsers/edge-review.png)    | ![screenshot](documentation/browsers/edge-signin.png)    | ![screenshot](documentation/browsers/edge-createreview.png)    | Works as expected   |
| Safari   | ![screenshot](documentation/browsers/safari-home.png)  | ![screenshot](documentation/browsers/safari-profile.png)  | ![screenshot](documentation/browsers/safari-review.png)  | ![screenshot](documentation/browsers/safari-signin.png)  | ![screenshot](documentation/browsers/safari-createreview.png)  | No access to tokens |

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device                | Home                                                         | Profile                                                         | Review                                                         | SignIn                                                         | Create Review                                                        | Notes               |
| --------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------- |
| Mobile (DevTools)     | ![screenshot](documentation/responsiveness/mobile-home.png)  | ![screenshot](documentation/responsiveness/mobile-profile.png)  | ![screenshot](documentation/responsiveness/mobile-review.png)  | ![screenshot](documentation/responsiveness/mobile-signin.png)  | ![screenshot](documentation/responsiveness/mobile-createreview.png)  | Works as expected   |
| Tablet (DevTools)     | ![screenshot](documentation/responsiveness/tablet-home.png)  | ![screenshot](documentation/responsiveness/tablet-profile.png)  | ![screenshot](documentation/responsiveness/tablet-review.png)  | ![screenshot](documentation/responsiveness/tablet-signin.png)  | ![screenshot](documentation/responsiveness/tablet-createreview.png)  | Works as expected   |
| 4K Monitor (DevTools) | ![screenshot](documentation/responsiveness/4k-home.png)      | ![screenshot](documentation/responsiveness/4k-profile.png)      | ![screenshot](documentation/responsiveness/4k-review.png)      | ![screenshot](documentation/responsiveness/4k-signin.png)      | ![screenshot](documentation/responsiveness/4k-createreview.png)      | Works as expected   |
| Desktop (PC/Windows)  | ![screenshot](documentation/responsiveness/desktop-home.png) | ![screenshot](documentation/responsiveness/desktop-profile.png) | ![screenshot](documentation/responsiveness/desktop-review.png) | ![screenshot](documentation/responsiveness/desktop-signin.png) | ![screenshot](documentation/responsiveness/desktop-createreview.png) | Works as expected   |
| Laptop (MacOS)        | ![screenshot](documentation/responsiveness/mac-home.png)     | ![screenshot](documentation/responsiveness/mac-profile.png)     | ![screenshot](documentation/responsiveness/mac-review.png)     | ![screenshot](documentation/responsiveness/mac-signin.png)     | ![screenshot](documentation/responsiveness/mac-createreview.png)     | Works as expected   |
| iPhone                | ![screenshot](documentation/responsiveness/iphone-home.png)  | ![screenshot](documentation/responsiveness/iphone-profile.png)  | ![screenshot](documentation/responsiveness/iphone-review.png)  | ![screenshot](documentation/responsiveness/iphone-signin.png)  | ![screenshot](documentation/responsiveness/iphone-createreview.png)  | No access to tokens |
