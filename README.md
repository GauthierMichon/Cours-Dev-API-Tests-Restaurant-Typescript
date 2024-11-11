# Projet Restaurant - Test Bdd Mock

## Description

Ce projet est une API RESTful développée en TypeScript, conçue pour gérer les opérations d'un restaurant. Elle permet de communiquer avec une base de données SQLite pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur diverses entités, telles que les clients, les employés, les tables, les commandes et les réservations.

### Fonctionnalités principales

- Gestion des clients, employés, tables, menus, réservations et commandes.
- Simulation de la base de données avec un mock pour les tests, permettant de vérifier les fonctionnalités sans interagir avec une base de données réelle.
- Tests unitaires pour chaque route en utilisant Jest et Supertest.

## Prérequis

Assurez-vous d'avoir **Node.js** installé sur votre machine.

## Installation

Clonez le dépôt, puis installez les dépendances nécessaires en utilisant :

```bash
npm install
```

## Lancer le projet

Lancer le jeu en exécutant la commande suivante :

```bash
npm run dev
```

Si vous rencontrez une erreur, essayez la commande suivante pour modifier temporairement les permissions d'exécution :

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Puis, relancez la commande :

```bash
npm run dev
```

L'API sera accessible par défaut à l'adresse http://localhost:3000.

## Tests

Les tests sont à effectuer dans les fichiers du dossier `__tests__`.

### Exécution des tests

- Utilisez la fonction `expect()` pour effectuer les vérifications.
- Utilisez `.mockImplementation` si vous avez besoin de forcer une fonction à prendre des valeurs spécifiques pour vos tests.
- Utilisez `.mockReturnValue` si vous avez besoin de forcer une fonction à retourner des valeurs spécifiques pour vos tests.
- Utilisez `.mockResolvedValue` pour forcer une fonction à retourner une valeur dans une Promise résolue, utile pour les fonctions asynchrones.

Pour lancer les tests, utilisez la commande suivante :

```bash
npm run test
```
