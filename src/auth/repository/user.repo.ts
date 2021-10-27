import { Entity, EntityRepository, Repository } from "typeorm"
import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

    //Get user data
    async fetchUser(req: any, res: Response){

        try{
            let data = await this.createQueryBuilder("user").select().getMany();
                        res.send(data);
        }catch(error){
            res.send(error);
        }
    }
    //Create a new user
    async signUp(req: Request, res: Response){

        const{username, useremail, userpassword} = req.body

       try{
        let validate = EmailValidator.validate(useremail);
        if(!validate){
            res.status(500).json({
                error: 'Email inválido.'
            });

        }else{
            let emailExist = await this.createQueryBuilder("user")
            .where("user.useremail = :query", {query : useremail})
            .getCount() > 0;

            if(emailExist){
                res.send({
                    data: "Email ya existe"
                });

            }else{
                const salt = await bcrypt.genSalt(10);
                await bcrypt.hash(userpassword, salt, async (error, data) => {
                    if(error){
                        res.send(error);
                    }else{
                        let user = new User
                        user.username = username;
                        user.userpassword = data;
                        user.useremail = useremail;

                        await this.save(user);

                        let userId = await this.createQueryBuilder("user")
                        .select("user.id")
                        .where("user.useremail = :query", { query: useremail })
                        .getOne();

                        var token = jwt.sign({id: userId}, "mykey", {
                            expiresIn: 86400,
                        });
                        res.send({
                            authentication: true,
                            token: token,
                        });
                    }
                });
            }
        }
       }
       catch(error){
           res.send(error);
       }
    }

    async login(req: Request, res: Response){

        const{useremail, userpassword} = req.body

        let validate = EmailValidator.validate(useremail);
        if(!validate){
            res.json({
                error: "Usuario no fue encontrado",
            });
        }else{
            let findUserFromDB = await this.createQueryBuilder("user")
            .select("user.userpassword")
            .where("user.useremail = :query", {query : useremail})
            .getOne();
             
            let userId = this.createQueryBuilder("user")
            .select("user.id")
            .where("user.useremail = :query", {query : useremail})
            .getOne();

            await bcrypt.compare(
                userpassword,
                findUserFromDB?.userpassword as string,
                (error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    if(!result)return res.send('Error de autenticación')
                    if(result){
                        var token = jwt.sign({id: userId}, "mykey", {
                            expiresIn: 86400,
                        });
                        res.send({
                            authentication: true,
                            token: token,
                        });
                    }
                        
                    }
            )

        }

       /* try{
        let user = new User()
        user.useremail = useremail;
        user.userpassword = userpassword;

        let userData = await this.save(user);


        let userId = await this.createQueryBuilder("user")
        .select("user.id")
        .where("user.useremail = :query", {query : useremail})
        .getOne();

        var token =  jwt.sign({id : userId}, "mykey", {
            expiresIn: 86400,
        });

        console.log(token);

        return res.send({
            authentication: true,
            token: token,
        });
       }
       catch(error){
           res.send(error);
       } */
    }



    /* //Delete a user
    async deleteUser(req: Request, res: Response){

        const{username} = req.body

       try{
        let data = await this.createQueryBuilder("user")
        .where("username = :query",{query: username})
        .delete()
        .execute();
        return res.send(data);
       }
       catch(error){
           console.log(error);
           res.send(error);
       }
    }

    //Update a user
    async updateUser(req: Request, res: Response){

        const{username, userpassword, id} = req.body

       try{
           let data = await this.createQueryBuilder("user")
           .update(User)
           .set({
               userpassword :  userpassword,
            })
               .where("username = :username", {username: username})
               .execute();

        return res.send(data);
       }
       catch(error){
           console.log(error);
           res.send(error);
       }
    } */
}