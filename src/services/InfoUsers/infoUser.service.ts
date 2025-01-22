export class InfoUserService {
    public userName: string = "";
    public password: string = "";

    public setUserInfo = (userName: string, password: string) => {
        this.userName = userName;
        this.password = password;
    }
}