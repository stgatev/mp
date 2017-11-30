interface IIdentityProvider {
    name: string;
    strategy: object;
}

class IdentityProvider implements IIdentityProvider {
    constructor(public name: string, public strategy: object) {}
}