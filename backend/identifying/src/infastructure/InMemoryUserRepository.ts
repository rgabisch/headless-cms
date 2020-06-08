import UserRepository from "../domain/UserRepository";
import {v1 as id} from "uuid";

class InMemoryUserRepository implements UserRepository {

    private users: Map<string, { id: string, password: string; }> = new Map();

    async signIn(email: string, password: string): Promise<any> {
        const _id = id();
        this.users.set(email, {id: _id, password});
        return _id;
    }

    async signUp(email: string, password: string): Promise<any> {
        const user = this.users.get(email);

        if (!user)
            return undefined;

        if (user.password !== password)
            return undefined;

        return user.id;
    }
}

export default InMemoryUserRepository;