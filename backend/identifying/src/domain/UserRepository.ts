interface UserRepository {

    signIn(email: string, password: string): Promise<any>

    signUp(email: string, password: string): Promise<any>

}

export default UserRepository;