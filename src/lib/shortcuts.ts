export const shortcuts = {
  home: {
    label: "home",
    key: "h",
  },
  about: {
    label: "about",
    key: "a",
  },
  blog: {
    label: "blog",
    key: "b",
  },
  x: {
    label: "𝕏",
    key: "x",
  },
  linkedIn: {
    label: "linkedIn",
    key: "l",
  },
  github: {
    label: "GitHub",
    key: "g",
  },
} as const satisfies {
  [key: string]: { label: string; key: string };
};
