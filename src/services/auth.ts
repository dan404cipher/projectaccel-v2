export const loginApi=({email,password}:{email:string,password:string})=>{

    let defaultUser={email:'defaultuser@exmaple.com',password:'Password@123'};

    if(email===defaultUser.email && password===defaultUser.password){
        return {success:true,message:'Login successful'};
    }
    else{
        return {success:false,message:'Invalid email or password'};
    }
}
