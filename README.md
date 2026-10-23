# TP4 – Application JavaScript structurée avec données liées

## Description
Application frontend (HTML, Bootstrap, JavaScript) qui charge trois fichiers JSON liés
(clients, produits, commandes), relie les données grâce aux identifiants et calcule
automatiquement les montants, les indicateurs et le détail de chaque commande.

## Structure du projet
- `index.html` : page principale
- `css/style.css` : styles
- `data/customers.json` : liste des clients
- `data/products.json` : liste des produits
- `data/orders.json` : liste des commandes
- `js/app.js` : initialisation, événements et render()
- `js/state.js` : état central de l'application
- `js/dataService.js` : chargement des fichiers JSON avec fetch()
- `js/selectors.js` : relations, filtres et calculs
- `js/view.js` : affichage dans le DOM

## Fonctionnalités
- Chargement des trois fichiers JSON avec fetch, async/await et try/catch
- Indicateurs : nombre de clients, produits, commandes et montant cumulé
- Recherche d'une commande par nom du client
- Filtre par statut de commande
- Filtre par catégorie de produit
- Filtres combinables
- Affichage du détail d'une commande dans un modal
- Message d'erreur si un fichier ne se charge pas

## Lancer le projet
1. Ouvrir le dossier dans VS Code
2. Installer l'extension Live Server
3. Clic droit sur `index.html` → Open with Live Server

## Auteur
SKIRIBOU HAYTAM (LST DI) – FST Marrakech