# Web3 Safe Contract - PokeVote

Ce projet est une application de vote sécurisé basée sur la blockchain Ethereum. Elle se compose de deux parties :

- **backend_safe** : Smart contracts Solidity déployés et testés avec Hardhat.
- **frontend_safe** : Interface utilisateur développée avec Vue 3, Vite et Ethers.js pour interagir avec les contrats.

---

## Fonctionnalités principales

- Déploiement d’un smart contract de vote (`VotingSafe.sol`) permettant :
  - Création de propositions.
  - Vote payant (0.01 ETH minimum).
  - Réinitialisation de son vote.
  - Consultation des résultats.
  - Retrait des fonds par l’owner.
- Frontend moderne pour :
  - Se connecter avec MetaMask.
  - Voter pour une proposition.
  - Voir les résultats en temps réel.

---

## Structure du projet

```
web3-safe-contract/
│
├── backend_safe/      # Smart contracts, scripts Hardhat, tests
│   ├── contracts/     # VotingSafe.sol, Lock.sol, Safe.sol
│   ├── test/          # Tests Hardhat
│   └── ...
│
├── frontend_safe/     # Application Vue 3 + Vite
│   ├── src/
│   │   ├── components/  # Composants Vue (VoteForm, ConnectWallet, etc.)
│   │   ├── views/       # Pages principales (VotingPage.vue)
│   │   └── ethers.js    # Interaction avec le smart contract
│   └── ...
└── README.md
```

---

## Démarrage rapide

### Prérequis

- Node.js (v18+ recommandé)
- npm
- MetaMask (pour le test du frontend)
- Un réseau local ou testnet Ethereum

---

### Backend (Hardhat)

```bash
cd backend_safe
npm install
npx hardhat compile
npx hardhat test
npx hardhat node
# Déployer le contrat (exemple)
npx hardhat run scripts/deploy.js --network localhost
```

- Les contrats principaux sont dans `contracts/`.
- Le contrat `VotingSafe.sol` gère la logique de vote.

---

### Frontend (Vue 3 + Vite)

```bash
cd frontend_safe
npm install
npm run dev
```

- Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.
- Connecte MetaMask sur le même réseau que le backend.

---

## Interaction avec le smart contract

L’interaction se fait via Ethers.js dans le frontend (`src/ethers.js`). Les principales fonctions sont :

- `vote(proposalIndex)` : Vote pour une proposition (0.01 ETH minimum).
- `resetVote()` : Réinitialise son vote.
- `getProposals()` : Récupère la liste des propositions et des votes.

---

## Scripts utiles

### Backend

- `npx hardhat test` : Lance les tests.
- `npx hardhat node` : Démarre un nœud local.
- `npx hardhat run scripts/deploy.js --network localhost` : Déploie le contrat.

### Frontend

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Build de production.
- `npm run lint` : Lint du code.

---

## Personnalisation

- Les propositions sont définies lors du déploiement du contrat.
- L’adresse du contrat doit être renseignée dans le frontend (`.env`).

---

## Technologies utilisées

- **Solidity**, **Hardhat** (backend)
- **Vue 3**, **Vite**, **Ethers.js**, **TailwindCSS** (frontend)
- **MetaMask** pour l’authentification et la signature des transactions

---

## Licence

MIT
