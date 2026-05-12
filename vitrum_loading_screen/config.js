const CONFIG = {
  links: {
    discord: "https://discord.gg/tondiscord",
    website: "https://ton-site.fr",
    rules: "https://ton-site.fr/reglement",
    shop: "https://ton-site.fr/boutique",
    workshop: "https://steamcommunity.com"
  },

  admins: [
    { name: "VitruM", role: "Fondateur", color: "#39a8ff", avatar: "👑" },
    { name: "Skyzen", role: "Administrateur", color: "#ff5151", avatar: "⚡" },
    { name: "Lunaris", role: "Modérateur", color: "#54e06f", avatar: "🛡️" },
    { name: "Halyx", role: "Modérateur", color: "#54e06f", avatar: "🧑" },
    { name: "Neox", role: "Modérateur", color: "#54e06f", avatar: "🤖" }
  ],

  // La file est cachée par défaut.
  // Pour la tester : index.html?queue=1&pos=12&total=32&eta=225
  queue: {
    enabledByDefault: false,
    averageSecondsPerPlayer: 18
  }
};
