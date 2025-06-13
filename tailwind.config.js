import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      boxShadow: {
        "auth-card": "0px 18px 24px -5px rgba(20, 21, 26, 0.1), 0px 8px 8px -5px rgba(20, 21, 26, 0.05)",
        sidebar: "0px 10px 16px -3px rgba(20, 21, 26, 0.08), 0px 3px 6px -2px rgba(20, 21, 26, 0.05)",
        section: "0px 10px 16px -3px rgba(20, 21, 26, 0.08), 0px 3px 6px -2px rgba(20, 21, 26, 0.05)",
        "custom-light-100": `inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 
                         0 0 0 1px hsla(230, 13%, 9%, 0.075), 
                         0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 
                         0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 
                         0 3.5px 6px hsla(230, 13%, 9%, 0.09)`,
        "custom-light-200": `inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 
                         0 0 0 1px hsla(230, 13%, 9%, 0.075), 
                         0 0.8px 1px hsla(230, 13%, 9%, 0.02), 
                         0 2px 4px hsla(230, 13%, 9%, 0.045), 
                         0 5px 9px hsla(230, 13%, 9%, 0.2)`,
        "custom-dark-100": `inset 0 0 0.5px 1px hsla(0, 0%, 0%, 0.2), 
                     0 0 0 1px hsla(230, 13%, 90%, 0.075), 
                     0 0.3px 0.4px hsla(230, 13%, 90%, 0.02), 
                     0 0.9px 1.5px hsla(230, 13%, 90%, 0.045), 
                     0 3.5px 6px hsla(230, 13%, 90%, 0.09)`,

        "custom-dark-200": `inset 0 0 0.5px 1px hsla(0, 0%, 0%, 0.2), 
                     0 0 0 1px hsla(230, 13%, 90%, 0.075), 
                     0 0.8px 1px hsla(230, 13%, 90%, 0.02), 
                     0 2px 4px hsla(230, 13%, 90%, 0.045), 
                     0 5px 9px hsla(230, 13%, 90%, 0.2)`
      },
      colors: {
        "bg-light": "hsl(var(--background-light))",
        "dark-gray": "hsl(var(--dark-gray))",
        "widget-bg-primary": "var(--widget-bg-primary)",
        "widget-bg-primary-secondary": "var(--widget-bg-primary-secondary)",
        "soft-light": "hsl(180, 3%, 86%)",
        "soft-dark": "hsl(240, 3%, 19%)",
        "custom-border": {
          primary: "#E9E9E9",
          DEFAULT: "#E9E9E9",
          secondary: "#d8d8d8"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
      },
      scrollbar: ["dark"],
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        widget: "var(--widget-radius)",
        messages: "var(--widget-messages-radius)",
        buttons: "var(--widget-buttons-radius)"
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        },
        "fade-scale": {
          "0%": {
            opacity: "0",
            transform: "translateY(-50%) scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(-50%) scale(1)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-scale": "fade-scale 0.2s ease-out"
      }
    }
  },
  plugins: [animate]
}
