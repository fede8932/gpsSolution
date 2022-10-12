const superUser=[{
    fullName: "Super Admin",
    email: "gpsadmin@gmail.com",
    password: "$2b$16$n4XyUOD.6rL8IY2raENhFe9g5Os2xGCCmUMReZXHCH6BiRvGyEh7W",//admin2022,
    superUser: true 
}]

export const expireDiscriminate = (a,b) => {
    if(a || b) return '1d'
    return '99999d'
};

module.exports= superUser
