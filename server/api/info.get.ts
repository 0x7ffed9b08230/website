import axios from "axios";

const cache = new Map<string, any>();

function makeRepoImage(username: string, repo: any, avatar: string, stars: number, description: string) {
  const makeText = (text: string) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + word).length > 40) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }
    lines.push(currentLine.trim());

    return lines.map((line, index) => {
      return `<text x="20" y="${70 + index * 20}" font-family="monospace" font-size="14" fill="#000000">${line}</text>`;
    }).join("\n");
  };

  const textDescription = makeText(description.slice(0, 200).concat(description.length > 200 ? "..." : ""));

  return `
<svg width="500" height="250" viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect x="0" y="0" width="500" height="250" fill="#F9FAFB" stroke="#000" stroke-width="2"/>
  
  <!-- Title and Repository Name -->
  <text x="20" y="40" font-family="monospace" font-size="20" fill="#000000" font-weight="bold">
    ${username} / <tspan fill="#007bff" font-weight="normal">${repo}</tspan>
  </text>

  <!-- Description -->
  ${textDescription}

  <!-- Stars and User ID -->
  <text x="380" y="220" font-family="monospace" font-size="14" fill="#D3D3D3">${stars} stars</text>
  <text x="380" y="240" font-family="monospace" font-size="14" fill="#D3D3D3">${username}</text>
</svg>
  `;
}

export default defineEventHandler(async (event) => {
  if (!process.env.GITHUB_USER || !process.env.GITHUB_TOKEN) {
    return new Response(
      "Please provide a GITHUB_USER and GITHUB_TOKEN environment variable",
      {
        status: 500,
      }
    );
  }

  const cachedData = cache.get("github-data");

  if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
    const data = cachedData.data;
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "Is-Cache": "true",
      },
    });
  }

  const [userResponse, repoResponse] = await Promise.all([
    axios.get(`https://api.github.com/users/${process.env.GITHUB_USER}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }),
    axios.get(`https://api.github.com/users/${process.env.GITHUB_USER}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }),
  ]);

  const profileReadmeResponse = await axios.get(
    `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_USER}`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  if (profileReadmeResponse.data.message !== "Not Found") {
    const readmeResponse = await axios.get(
      `https://raw.githubusercontent.com/${process.env.GITHUB_USER}/${process.env.GITHUB_USER}/master/README.md`
    );

    const readmeContent = readmeResponse.data.replace(
      /(\]\(|src=")(\.\/)/g,
      `$1https://raw.githubusercontent.com/${process.env.GITHUB_USER}/${process.env.GITHUB_USER}/master/`
    );

    userResponse.data.README = readmeContent;
  }

  const rawData = userResponse.data;
  rawData.public_repos = repoResponse.data.length;
  rawData.repos = repoResponse.data.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language || "Unknown",
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    license: repo.license ? repo.license.spdx_id : "None",
    html_url: repo.html_url,
    image: makeRepoImage(
      rawData.login,
      repo.name,
      rawData.avatar_url,
      repo.stargazers_count,
      repo.description
    ).replace(/\n/g, ""),
  }));

  const data = {
    data: {
      name: rawData.name,
      login: rawData.login,
      avatar_url: rawData.avatar_url,
      bio: rawData.bio,
      location: rawData.location,
      blog: rawData.blog,
      twitter_username: rawData.twitter_username,
      public_repos: rawData.public_repos,
      public_gists: rawData.public_gists,
      followers: rawData.followers,
      following: rawData.following,
      created_at: rawData.created_at,
      updated_at: rawData.updated_at,
      repos: rawData.repos,
      README: rawData.README,
    },
  };

  cache.set("github-data", {
    timestamp: Date.now(),
    data,
  });

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=3600",
      "Access-Control-Allow-Origin": "*",
      "Is-Cache": "false",
    },
  });
});
