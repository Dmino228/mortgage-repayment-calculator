import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        lightCol: "var(--light-col)",
        veryLightCol: "var(--very-light-col)",
        veryLightCol2: "var(--very-light-col2)",
        darkCol: "var(--dark-col)",
        veryDarkCol: "var(--very-dark-col)",
      },
    },
  },
  plugins: [],
} satisfies Config;
