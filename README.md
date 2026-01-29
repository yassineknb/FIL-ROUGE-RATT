# 🔎 Lost & Found
**Lost & Found** est une application web moderne permettant de **déclarer**, **consulter** et **gérer** des objets **perdus** ou **trouvés**.  
Le projet utilise un **backend Laravel 10 (API)** et un **frontend React** afin d’offrir une expérience simple, rapide et intuitive.

---

## 🚀 Fonctionnalités

### 👤 Utilisateur
- Authentification sécurisée (**inscription / connexion**) avec **Laravel Sanctum**
- Consultation de la liste des objets (perdus / trouvés)
- Filtres simples :
  - par **type** (lost / found)
  - par **lieu**
- Déclaration d’un objet (formulaire : titre, description, type, lieu, date)
- Espace **Mes déclarations** :
  - voir uniquement ses objets
  - modifier / supprimer ses objets (selon autorisation)

### 🛡️ Administrateur
- Accès protégé par rôle **admin**
- Gestion globale des objets :
  - voir tous les objets
  - modifier le statut (`pending`, `resolved`, `archived`)
  - supprimer un objet incorrect ou dupliqué

### ✅ Qualité & sécurité
- Validation des champs (erreurs **422** en JSON)
- Protection des routes privées (**401/403** en JSON)
- Autorisation via **Policies** (owner ou admin)

---

## 🛠️ Stack Technique

### Backend
- **Framework** : Laravel 10 (API)
- **Base de données** : MySQL 
- **Authentification & Sécurité** : Laravel Sanctum (Bearer Token)
- **Tests** : PHPUnit

### Frontend
- **React** (React Router, Hooks, Context/State)
- **Axios** (communication API)
- **TailwindCSS / CSS** (UI)

---
### Figma : https://www.figma.com/design/rIQu7axFMAGuL2CFFc9zMq/Untitled?node-id=2-14&t=wzfAvA2AAbCMcnOY-1

