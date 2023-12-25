/** @type {import('tailwindcss').Config} */

const currentTheme = "new";

const themes = {
  default: {
    text: {
      50: "#eef6f2",
      100: "#ddeee5",
      200: "#bbddca",
      300: "#99ccb0",
      400: "#77bb96",
      500: "#55aa7b",
      600: "#448863",
      700: "#33664a",
      800: "#224431",
      900: "#112219",
      950: "#09110c",
    },
    background: {
      50: "#eff6f2",
      100: "#deede6",
      200: "#bddbcc",
      300: "#9cc9b3",
      400: "#7bb799",
      500: "#5ba480",
      600: "#488466",
      700: "#36634d",
      800: "#244233",
      900: "#12211a",
      950: "#09100d",
    },
    primary: {
      50: "#eef6f2",
      100: "#ddeee5",
      200: "#bbddcb",
      300: "#99ccb1",
      400: "#77bb97",
      500: "#55aa7d",
      600: "#448864",
      700: "#33664b",
      800: "#224432",
      900: "#112219",
      950: "#09110c",
    },
    secondary: {
      50: "#eeeff6",
      100: "#dddfee",
      200: "#bbbfdd",
      300: "#999fcc",
      400: "#777fbb",
      500: "#555faa",
      600: "#444c88",
      700: "#333966",
      800: "#222644",
      900: "#111322",
      950: "#090a11",
    },
    accent: {
      50: "#f1eef6",
      100: "#e4ddee",
      200: "#c8bcdc",
      300: "#ad9acb",
      400: "#9178ba",
      500: "#7657a8",
      600: "#5e4587",
      700: "#473465",
      800: "#2f2343",
      900: "#181122",
      950: "#0c0911",
    },
  },

  secondary: {
    text: "rgb(9, 18, 13)",
    background: "rgb(246, 250, 248)",
    primary: "rgb(101, 177, 137)",
    secondary: "rgb(168, 173, 211)",
    accent: "rgb(155, 132, 192)",
  },

  new: {
    text: {
      50: "#f5f4ef",
      100: "#ebeae0",
      200: "#d7d5c1",
      300: "#c3bfa2",
      400: "#afaa83",
      500: "#9c9563",
      600: "#7c7750",
      700: "#5d593c",
      800: "#3e3c28",
      900: "#1f1e14",
      950: "#100f0a",
    },
    background: {
      50: "#f9f7ec",
      100: "#f3efd8",
      200: "#e7dfb1",
      300: "#dad08b",
      400: "#cec064",
      500: "#c2b03d",
      600: "#9b8d31",
      700: "#746a25",
      800: "#4e4618",
      900: "#27230c",
      950: "#131206",
    },
    primary: {
      50: "#f8f6ed",
      100: "#f0eedb",
      200: "#e2ddb6",
      300: "#d3cc92",
      400: "#c5bb6d",
      500: "#b6aa49",
      600: "#92883a",
      700: "#6d662c",
      800: "#49441d",
      900: "#24220f",
      950: "#121107",
    },
    secondary: {
      50: "#f9f7eb",
      100: "#f3f0d8",
      200: "#e7e1b1",
      300: "#dbd28a",
      400: "#cfc263",
      500: "#c3b33c",
      600: "#9c8f30",
      700: "#756c24",
      800: "#4e4818",
      900: "#27240c",
      950: "#141206",
    },
    accent: {
      50: "#faf8ea",
      100: "#f6f2d5",
      200: "#ece5ac",
      300: "#e3d782",
      400: "#d9ca59",
      500: "#d0bd2f",
      600: "#a69726",
      700: "#7d711c",
      800: "#534c13",
      900: "#2a2609",
      950: "#151305",
    },
  },
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        text: themes[currentTheme].text,
        background: themes[currentTheme].background,
        primary: themes[currentTheme].primary,
        secondary: themes[currentTheme].secondary,
        accent: themes[currentTheme].accent,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};