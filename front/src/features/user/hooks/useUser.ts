import { useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  // Ajouter la logique de récupération utilisateur ici
  return { user, setUser };
}
