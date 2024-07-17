export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "VtubersTV",
    techs: ["Astro", "TypeScript", "TailwindCSS", "MongoDB"],
    link: "https://vtubers.tv",
    isComingSoon: true,
  },
  {
    title: "Git Account Switcher",
    techs: ["Python"],
    link: "https://github.com/0x7ffed9b08230/git-account-switcher",
  },
];

export default projects;
