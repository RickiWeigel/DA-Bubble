import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, query, where, limit, orderBy, onSnapshot, addDoc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class'
import { BehaviorSubject } from 'rxjs';
import { getDocs } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();
    firestore: Firestore = inject(Firestore);

    constructor() {
        this.getAllUsers();
    }

    async addUser(user: User) {
        try {
            const docRef = await addDoc(collection(this.firestore, "users"), user.toJSON());
            console.log(docRef.id);
            return docRef.id;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async updateUser(user: User) {
        if (user.id) {
            const docRef = doc(collection(this.firestore, 'users'), user.id);
            await updateDoc(docRef, user.toJSON()).catch(console.error);
        }
    }

    async deleteUser(user: User) {
        await deleteDoc(doc(collection(this.firestore, 'users'), user.id)).catch(
            (err) => { console.log(err); }
        )
    }

    getAllUsers() {
        const q = query(collection(this.firestore, 'users'));
        onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => User.fromFirestore({ id: doc.id, data: () => doc.data() }));
            this.usersSubject.next(users);
        });
    }

    async getUserByID(userID: string): Promise<User | null> {
        try {
            const docRef = doc(this.firestore, 'users', userID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const user = new User({
                    id: docSnap.id,
                    ...docSnap.data()
                });
                return user;
            } else {
                console.log('No such user doc!');
                return null;
            }
        } catch (error) {
            console.error("Error getting user doc:", error);
            return null;
        }
    }

    async getUserByAuthUid(authUid: string): Promise<User | null> {
        try {
            const usersRef = collection(this.firestore, 'users');
            const q = query(usersRef, where("uid", "==", authUid), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                return new User({
                    id: docSnap.id,
                    ...docSnap.data()
                });
            } else {
                console.log('Kein Usier in der Auth');
                return null;
            }
        } catch (error) {
            console.error("fehler beim abrufen der Auth", error);
            return null;
        }
    }

    async updateUserStatusByUid(uid: string, status: string): Promise<void> {
        const usersRef = collection(this.firestore, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            await updateDoc(userDocRef, { status: status });

        } else {

        }
    }
}