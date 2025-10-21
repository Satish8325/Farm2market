export class Login_response {
    flag: boolean;
    message?: string;
    token?: string;
    accessToken?:string;
    refreshToken?: string;
    isDefaultPassword: boolean;
}

export class AutheticationModel{
    IsEmailOTPEnabled? : boolean = false;
    IsSMSOTPEnabled? : boolean = false;
}