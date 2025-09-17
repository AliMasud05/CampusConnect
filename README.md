
# Nextjs-redux-startar-pack-with-reusalbe-form 🚀

A powerful, opinionated starter kit for building modern Next.js applications with best practices and essential libraries.

## Features

* ✅ Next.js 14 – The latest Next.js features and optimizations
* ✅ TypeScript – Strict type safety for better development experience
* ✅ Tailwind CSS – Utility-first CSS framework for rapid styling
* ✅ State Management – Redux Toolkit with Redux Persist for robust state handling
* ✅ Form Handling – Zod + React Hook Form for type-safe form validation
* ✅ Notifications – Sonner for beautiful toast notifications
* ✅ Utility Helpers – clsx, tailwind-merge, class-variance-authority for better class * management
* ✅ Authentication Ready – Easily integrate authentication using cookies (js-cookie)
* ✅ Icon Support – React Icons for a wide variety of SVG icons


## Run Locally

Clone the project

```bash
  git clone https://github.com/merajfaizan/nextjs-redux-startar-pack-with-reusalbe-form.git
```

Go to the project directory

```bash
  cd nextjs-redux-startar-pack-with-reusalbe-form
  code .
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Tailwind Cofiguration

you can setup your tailwind config with own colors by editing these:

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| background color | var(--background) > #ffffff |
| foreground color | var(--background) > #0B031F |
| primary color | #7C45F9 |
| secondary Color | #102F22 |
| success Color | #102F22 |
| info Color | #D9F4F9 |
| warning Color | #FAE4D0 |
| danger Color | #d7191c |


## Container

- Default Container is 1440px
- Container is center by default with 1 rem padding


## Features

At src > Components > Form

* MyFormWrapper :- you can use this as your form wrapper, here you can pass the default values and zod validation.
* MyFormInput :- You can use this as your dynamic input you just need to pass types and name and level to work with it. type default will be text. default will be required if want to make false then you can simply add required to false. and you have the access to pass classNames dynamically. and have the type suggetions for your better understanding.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_BASE_URL` = `http://localhost:5000/api/v1`


## Contributing

 Contributions are always welcome!

 Note: This starter in under development so there may have bug or any issues. if you find something irrelevant kindly contact with the developer.

# naufalhardiansy-frontend-nextjs
