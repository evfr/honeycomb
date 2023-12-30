import {iUser} from '../types/types';
import DbService from './DbService';
import { Db, Collection, WithId, Document } from 'mongodb';

class UserService {
    private db: Db | undefined;
  
    public async getUserById(userId: number): Promise<iUser | null> {
      this.db = await DbService.getDb();
      const dbUser: WithId<Document> | null = await this.db.collection("users").findOne({id: userId }) as WithId<Document>;
      if (dbUser) {
        const user: iUser = {
          name: dbUser.name,
          pass: ''
        }
        return user;
      }
      return null;
    }

    public async getUserByNameAndPass(name: string, pass: string): Promise<iUser | null> {
      this.db = await DbService.getDb();
      const dbUser: WithId<Document> | null = await this.db.collection("users").findOne({name, pass}) as WithId<Document>;
      if (dbUser) {
        const user: iUser = {
          name: dbUser.name,
          pass: ''
        }
        return user;
      }
      return null;
    }
  
    public async createUser(name: string, pass: string): Promise<iUser | null> {
      this.db = await DbService.getDb();
      const newUser: iUser = { name, pass };
      await this.db.collection("users").insertOne(newUser);
      return newUser;
    }
  }
  
  export default UserService;