type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

const presentation: Presentation = {
  mail: "stella.dev@proton.me",
  title: "Hi, I’m Stella 👋",
  description: `I'm a software developer and a Tokyo University student. I speak English, Japanese, and Polish. I am a 20 year old Trans Women. I am a Vtuber and I am the Owner and Lead Developer of the VtubersTV project`,
  socials: [
    {
      label: "X",
      link: "https://twitter.com/0x7ffed9b08230",
    },
    {
      label: "Patreon",
      link: "https://patreon.com/0x7ffed9b08230",
    },
    {
      label: "Github",
      link: "https://github.com/0x7ffed9b08230",
    },
  ],
};

export default presentation;
