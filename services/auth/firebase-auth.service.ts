import { signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export class FirebaseAuthService {
  async signInWithGoogle(): Promise<UserCredential> {
    return await signInWithPopup(auth, googleProvider);
  }
}

export const firebaseAuthService = new FirebaseAuthService();