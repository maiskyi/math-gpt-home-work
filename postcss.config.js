/**
 * @type {import('postcss').ProcessOptions}
 */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "media",
  prefix: "plasmo-",
  plugins: {
    tailwindcss: {}
  }
}
