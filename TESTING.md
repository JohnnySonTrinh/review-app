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
