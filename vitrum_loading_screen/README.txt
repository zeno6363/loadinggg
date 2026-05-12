# VITRUM RP - Loading Screen GMod

## Installation rapide

1. Héberge le dossier complet sur un site web.
2. Mets l’URL de `index.html` dans ta config serveur :

```cfg
sv_loadingurl "https://ton-domaine.fr/vitrum_loading_screen/index.html"
```

3. Redémarre ton serveur.

## Modifier les admins

Ouvre `config.js`, puis change la liste :

```js
admins: [
  { name: "Pseudo", role: "Fondateur", color: "#39a8ff", avatar: "👑" }
]
```

## Modifier les boutons

Dans `config.js`, remplace les liens Discord, site, boutique, workshop.

## File d’attente

La file est cachée par défaut.

Pour tester :
```txt
index.html?queue=1&pos=12&total=32&eta=225
```

Important : GMod seul ne donne pas automatiquement une vraie file d’attente au loading screen.
Il faut un système serveur/backend/addon qui passe ces infos à l’URL ou appelle :

```js
QueueStatus(true, 12, 32, 225);
```

Si le serveur n’est pas plein :
```js
QueueStatus(false);
```
