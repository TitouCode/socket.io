Développeurs
    - TitouCode

### First of All
Vérifier l'existence du fichier ``` locale.js ``` à la racine de ce dossier. Si il n'éxiste pas, le copier depuis le /script/locale.js et remplacer les éléments pous se connecter à votre API

### Structure

```
├── index.js // entry point
├── locale.js // locale configuration of the app
├── script
|   └── locale.js // locale sample
|
└── sockets
    |    └── modules
    |         └── ... // Sockets event splited into Modules
    └── socket.js // Root class, sockets loader

```