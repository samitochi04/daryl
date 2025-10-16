# Configuration de l'Authentification Admin

## Vue d'ensemble

Daryl utilise maintenant le système d'authentification intégré de Supabase (`auth.users`) au lieu d'une gestion manuelle des mots de passe. Tous les utilisateurs ajoutés à Supabase Auth sont automatiquement synchronisés avec la table `admins`.

## Configuration en 3 étapes

### Étape 1 : Exécuter le schéma de base de données

Dans le **SQL Editor** de Supabase, exécutez le fichier `supabase/schema.sql` :

```sql
-- Cela créera toutes les tables nécessaires
-- La table admins est maintenant liée à auth.users
```

### Étape 2 : Installer la fonction de synchronisation

Dans le **SQL Editor** de Supabase, exécutez le fichier `supabase/sync_auth_to_admins.sql` :

```sql
-- Cela créera une fonction et un trigger qui ajoutent automatiquement
-- chaque nouvel utilisateur de auth.users à la table admins
```

**Note importante :** Cette fonction s'exécute automatiquement pour tous les **nouveaux** utilisateurs créés. Pour les utilisateurs existants, décommentez et exécutez la section "Optional" dans le fichier.

### Étape 3 : Créer un utilisateur admin

Vous avez **3 options** pour créer un utilisateur admin :

#### Option A : Via l'interface Supabase (Recommandé)

1. Allez dans **Authentication** > **Users** dans votre dashboard Supabase
2. Cliquez sur **Add User** ou **Invite User**
3. Remplissez :
   - **Email** : `admin@daryl.com` (ou votre email)
   - **Password** : Créez un mot de passe sécurisé
   - **Auto Confirm User** : ✅ Cochez cette case
   - **User Metadata** (optionnel) : Ajoutez `{ "name": "Admin Daryl" }`
4. Cliquez sur **Create User**

✨ **L'utilisateur sera automatiquement ajouté à la table `admins` grâce au trigger !**

#### Option B : Via le SQL Editor

```sql
-- Insérer un utilisateur directement (Supabase Auth)
-- Remplacez l'email et ajustez les valeurs
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@daryl.com',
  crypt('VotreMotDePasseSécurisé', gen_salt('bf')),
  NOW(),
  '{"name": "Admin Daryl"}'::jsonb,
  NOW(),
  NOW()
);
```

⚠️ **Attention** : Cette méthode est plus complexe. Utilisez l'Option A si possible.

#### Option C : Via l'API Supabase (Pour développeurs)

```javascript
// Dans votre code ou la console du navigateur
const { data, error } = await supabase.auth.signUp({
  email: 'admin@daryl.com',
  password: 'VotreMotDePasseSécurisé',
  options: {
    data: {
      name: 'Admin Daryl'
    }
  }
})
```

## Connexion Admin

Une fois l'utilisateur créé, vous pouvez vous connecter :

1. Allez sur `http://localhost:3000/admin/login`
2. Utilisez les identifiants que vous avez créés
3. Vous serez redirigé vers le dashboard admin

## Gestion des utilisateurs

### Ajouter d'autres admins

Répétez simplement l'Étape 3 avec un autre email. Tous les utilisateurs de `auth.users` sont considérés comme des admins.

### Changer un mot de passe

**Via l'interface Supabase** :
1. Allez dans **Authentication** > **Users**
2. Cliquez sur l'utilisateur
3. Cliquez sur **Reset Password** ou **Send Magic Link**

**Via le SQL Editor** :
```sql
UPDATE auth.users
SET encrypted_password = crypt('NouveauMotDePasse', gen_salt('bf'))
WHERE email = 'admin@daryl.com';
```

### Supprimer un admin

**Via l'interface Supabase** :
1. Allez dans **Authentication** > **Users**
2. Trouvez l'utilisateur et cliquez sur les 3 points (...)
3. Sélectionnez **Delete User**

L'entrée dans la table `admins` sera automatiquement supprimée grâce à `ON DELETE CASCADE`.

## Sécurité

### Row Level Security (RLS)

La table `admins` est protégée par RLS. Seuls les utilisateurs authentifiés peuvent lire les données admin.

### Vérification lors de la connexion

Le système vérifie que :
1. ✅ L'utilisateur existe dans `auth.users` (Supabase Auth)
2. ✅ L'utilisateur existe dans la table `admins`
3. ✅ Le mot de passe est correct

Si l'utilisateur n'est pas dans la table `admins`, il sera déconnecté avec le message "Accès non autorisé".

## Dépannage

### L'utilisateur ne peut pas se connecter

1. Vérifiez que l'utilisateur existe dans **Authentication** > **Users**
2. Vérifiez que l'utilisateur est dans la table `admins` :
   ```sql
   SELECT * FROM admins WHERE email = 'admin@daryl.com';
   ```
3. Si l'utilisateur n'est pas dans `admins`, exécutez manuellement :
   ```sql
   INSERT INTO admins (id, email, name)
   SELECT id, email, COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1))
   FROM auth.users
   WHERE email = 'admin@daryl.com';
   ```

### Le trigger ne fonctionne pas

Vérifiez que le trigger existe :
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

Si absent, réexécutez `sync_auth_to_admins.sql`.

### Erreur "Accès non autorisé"

Cela signifie que l'utilisateur peut se connecter à Supabase Auth mais n'est pas dans la table `admins`. Ajoutez-le manuellement avec la commande SQL ci-dessus.

## Récapitulatif

✅ **Plus besoin de `add_admin.sql`** - C'est automatique !  
✅ **Utilisez l'interface Supabase** pour créer des utilisateurs  
✅ **Le système est plus sécurisé** avec Supabase Auth  
✅ **Gestion des mots de passe simplifiée** avec les outils Supabase  

Tous les utilisateurs Supabase Auth = Admins de Daryl ! 🚀
