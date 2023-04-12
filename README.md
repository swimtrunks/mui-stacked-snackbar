# Design Engineer technical challenge @ MUI
## Objective

- **Stack:** You can use Base UI's [`UnstyledSnackbar`](https://mui.com/base/react-snackbar/) component or another headless component library as the foundation for it.
- **Interactivity:**
  - The other Snackbar instances should be visible after some interaction, either clicking a button or hovering the stack.
  - They should be kept open if the focus is inside them. Conversely, they should collapse as the focus moves out of it.
  - There should be the possibility to close them by clicking on a close button.
  - _Bonus:_ adding an option for it to be closed after some configurable time interval. It should still be compatible with [WCAG 2.2.1](https://www.w3.org/TR/WCAG21/#enough-time).
- **Transitions:** the Snackbars should appear and disappear gracefully on the screen, using an animation.
- **Dark mode:** make sure to support light and dark modes.

## Work environment

To save you time, a working environment was created with Next.js/TypeScript/eslint, etc.
You can install this environment by following these steps:

- clone the repo: `git clone git@github.com:mui/tech-challenge-design-engineer.git`
- install the dependencies: `yarn`
- start Next.js: `yarn dev`
- open http://0.0.0.0:3002/

## Submission

Instructions:

- **DO NOT** host your project on a public repository.
- Please send us a .zip file containing this project using the upload link that we have provided by email (**with** the _.git_ folder).
- To significantly reduce the size of the archive, you can remove the `/_node_modules_/` and `/.next/` folders.
- If you don't have the upload link, you can simply send it to job@mui.com.

We're excited and looking forward to seeing what you'll create!
Good luck 🚀
