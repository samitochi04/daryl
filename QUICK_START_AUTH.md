# Configuration Rapide - 5 Minutes ⚡

## Étape 1 : Configurer la Base de Données (2 min)

Dans le **SQL Editor** de votre dashboard Supabase :

### A. Exécuter le schéma principal
```sql
-- Copier-coller tout le contenu de supabase/schema.sql et exécuter
```

### B. Installer la synchronisation automatique
```sql
-- Copier-coller tout le contenu de supabase/sync_auth_to_admins.sql et exécuter
```

✅ **Vérification** : Dans le **Table Editor**, vous devriez voir les tables `blogs`, `email_subscriptions`, `contact_messages`, et `admins`.

## Étape 2 : Créer Votre Compte Admin (1 min)

Dans votre dashboard Supabase :

1. **Authentication** → **Users** → **Add User**
2. Remplissez :
   - **Email** : votre-email@exemple.fr
   - **Password** : Choisissez un mot de passe fort
   - **✅ Auto Confirm User** : Cochez cette case
   - **User Metadata (optionnel)** : `{ "name": "Votre Nom" }`
3. Cliquez sur **Create User**

✅ **Vérification** : Dans **Table Editor** → **admins**, vous devriez voir votre utilisateur.

## Étape 3 : Configurer les Variables d'Environnement (2 min)

### Frontend (`.env`)
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anonyme
VITE_BACKEND_URL=http://localhost:5000
```

**Où trouver ces valeurs ?**
- Dashboard Supabase → **Settings** → **API**
- **Project URL** = VITE_SUPABASE_URL
- **anon/public key** = VITE_SUPABASE_ANON_KEY

### Backend (`backend/.env`)
```env
PORT=5000

# Email Configuration (pour nodemailer)
EMAIL_HOST=smtp.votre-provider.com
EMAIL_PORT=587
EMAIL_USER=votre-email@exemple.fr
EMAIL_PASS=votre-mot-de-passe-app
EMAIL_FROM="Daryl <noreply@daryl.com>"
CONTACT_EMAIL=contact@daryl.com
```

## Étape 4 : Lancer l'Application

### Terminal 1 - Frontend
```bash
cd C:\Users\temmo\Desktop\PROJECTS\daryl
npm run dev
```

### Terminal 2 - Backend
```bash
cd C:\Users\temmo\Desktop\PROJECTS\daryl\backend
npm run dev
```

## Étape 5 : Test de Connexion

1. Ouvrez `http://localhost:3000/admin/login`
2. Connectez-vous avec l'email et mot de passe créés à l'Étape 2
3. Vous devriez être redirigé vers `/admin/dashboard` 🎉

---

## ⚠️ Problèmes Courants

### Erreur "Accès non autorisé"
- **Cause** : L'utilisateur n'est pas dans la table `admins`
- **Solution** : 
  ```sql
  -- Exécuter dans SQL Editor
  INSERT INTO admins (id, email, name)
  SELECT id, email, COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1))
  FROM auth.users
  WHERE email = 'votre-email@exemple.fr';
  ```

### Le trigger ne fonctionne pas
- **Cause** : `sync_auth_to_admins.sql` n'a pas été exécuté
- **Solution** : Retournez à l'Étape 1B

### Impossible de se connecter
- **Cause** : Email/mot de passe incorrect ou compte non confirmé
- **Solution** : 
  1. Vérifiez dans **Authentication** → **Users** que **Email Confirmed At** est rempli
  2. Si non, cliquez sur les 3 points → **Send Confirmation Email**
  3. Ou recréez l'utilisateur avec **Auto Confirm User** coché

### Variables d'environnement non détectées
- **Cause** : Fichier `.env` mal placé ou nom incorrect
- **Solution** :
  - Frontend : `.env` doit être à la racine du projet (à côté de `package.json`)
  - Backend : `.env` doit être dans le dossier `backend/`
  - Redémarrez les serveurs après modification

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **ADMIN_SETUP.md** - Guide complet de configuration admin
- **AUTH_CHANGES.md** - Résumé de tous les changements
- **SETUP_GUIDE.md** - Guide de configuration générale du projet

---

## ✨ C'est Prêt !

Votre site Daryl est maintenant configuré avec :
- ✅ Authentification Supabase sécurisée
- ✅ Dashboard admin fonctionnel
- ✅ Système de blog prêt à l'emploi
- ✅ Formulaire de contact avec emails
- ✅ Newsletter subscription
- ✅ Interface traduite en français

**Prochaine étape** : Créez votre premier article de blog depuis `/admin/blogs` ! 🚀
