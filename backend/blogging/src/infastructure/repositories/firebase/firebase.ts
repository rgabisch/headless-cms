// Load Firebase modules
import * as admin from 'firebase-admin'
import serviceAccount from './serviceaccount.json'
import {Storage} from '@google-cloud/storage';
import Creator from "../../../domain/entities/Creator";

/*
A Class to initialize a connection to the fire(data)base
the database is pre-set on: "https://headless-cms-15c61.firebaseio.com"
the credentials are pre-set based on the firebase serviceaccount
*/
admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id
    }),
    databaseURL: "https://headless-cms-15c61.firebaseio.com",
    storageBucket: "headless-cms-15c61.appspot.com"
});


class Firebase {

    // Root-Destination (e.g. 'Space', 'Type', ...)
    root: string;
    storage: any;

    // Constructor to initialize the database connection
    constructor(root: string) {

        this.root = root;
        const storage = new Storage({keyFilename: "./serviceaccount.json"});
        this.storage = storage.bucket("headless-cms-15c61.appspot.com")

    }


    /*
    Read Data from the Reference

    param:
        id (string - optional) : fetch object(s) by the given id
        [no id given = all objects under the reference]

    return:
        object : the data stored behind the reference 
    */
    async db_get(id: string = "") {
        let ref = this.ref(id)
        if (await this.exists(ref)) {
            return (await ref.once('value')).val();
        } else {
            console.log(`[INFO]: Read - Object with ID ${id} doesn't exists`)
            return false
        }
    }


    /*
    Download Data from the Storage

    param:
        filename (string) : download data with given filename

    return:
        data (Buffer) : the data stored in storage
    */
    async storage_get(filename: string) {
        if (await this.storage_exists(filename)) {
            let data = await this.storage.file(this.root + "/" + filename).download()
            return data
        } else {
            console.log(`[ERROR]: Read Storage - Object with Filename ${filename} doesn't exists`)
        }

    }


    /*
    Insert Data into the reference

    param:
        new_id (string): the new given id
        key_values (object): the data to be stored
    */
    async db_add(new_id: string, key_values: object) {
        if (new_id.trim() != "") {
            let ref = this.ref(new_id)
            if (!await this.exists(ref)) {
                ref.set(key_values)
            } else {
                console.log(`[ERROR]: Insert - Object with ID ${new_id} already exists`)
            }
        } else {
            console.log(`[ERROR]: Insert - ID can't be empty`)
        }
    }

    /*
    Insert Data into the Storage

    param:
        filename (string): the new given id/filename
        key_values (Buffer): the data to be stored
    */

    async storage_add(filename: string, key_values: Buffer) {
        if (filename.trim() != "") {
            if (await this.storage_exists(filename)) {
                console.log(`[ERROR]: Insert - Object with Filename ${filename} already exists`)
            } else {
                this.storage.file(this.root + "/" + filename).save(key_values, function (err: any) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        } else {
            console.log(`[ERROR]: Insert - Filename can't be empty`)
        }
    }


    /*
    Remove Data from the reference

    param:
        id (string): the object to be removed
    */
    async db_remove(id: string) {
        if (id.trim() != "") {
            let ref = this.ref(id)
            if (await this.exists(ref)) {
                ref.remove()
            } else {
                console.log(`[ERROR]: Remove - Object with ID ${id} doesn't exist`)
            }
        } else {
            console.log(`[ERROR]: Remove - ID can't be empty`)
        }
    }


    /*
 Remove Data from the Storage

 param:
     filename (string): the object to be removed
 */
    async storage_remove(filename: string) {
        if (filename.trim() != "") {
            if (!await this.storage_exists(filename)) {
                console.log(`[ERROR]: Remove - Object with Filename ${filename} doesn't exist`)
            } else {
                this.storage.file(this.root + "/" + filename).delete(function (err: any, apiResponse: any) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        } else {
            console.log(`[ERROR]: Remove - Filename can't be empty`)
        }
    }

    async storage_getURL(filepath: string) {
        let data = await this.storage.file(this.root + "/" + filepath).getSignedUrl({action : "read", expires : "01-01-9999"})
        .catch((err: any) => {console.log(err)})
        return data
       

    }

    /*
    Update Data within the reference

    param:
        id (string): the object to be update
        key_vaues (object): the data to replace
    */
    async db_update(id: string, key_values: object) {
        if (id.trim() != "") {
            let ref = this.ref(id)
            if (await this.exists(ref)) {
                ref.set(key_values)
            } else {
                console.log(`[ERROR]: Update - Object with ID ${id} doesn't exist`)
            }
        } else {
            console.log(`[ERROR]: Update - ID can't be empty`)
        }
    }

    /*
  Update existing Data in the the Storage

  param:
      filename (string): the new given id/filename
      key_values (Buffer): the data to be stored
  */

    async storage_update(filename: string, key_values: Buffer) {
        if (filename.trim() != "") {
            if (!await this.storage_exists(filename)) {
                console.log(`[ERROR]: Remove - Object with Filename ${filename} doesn't exist`)
            } else {
                this.storage.file(this.root + "/" + filename).save(key_values, function (err: any) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        } else {
            console.log(`[ERROR]: Insert - Filename can't be empty`)
        }
    }

    /*
    -----------------------------------------------------------
    Helper Function

    functions:
        ref - returns a reference of the database destination
        exist - returns true if a object exists on a reference
    */


    /*
    Get a Reference-Object to apply the CRUD-Methods

    param:
        id (string) - optional: the id of the reference-object from the root place
        [e.g. "Space/" (without id - all objects) | "Space/1" (with id - object with the ID 1)]

    return:
        reference : the reference, to apply operations (e.g. CRUD)
    */
    ref(id: string = ""): admin.database.Reference {
        return admin.database().ref(this.root + "/" + id)
    }


    /*
    Look up if any Object(s) exists on the referene

    param:
        ref (adin.database.Reference): The Reference to lookUp
    
    Return:
        true : if any object(s) exists
        false: if any object(s) doesn't exists
    */
    async exists(ref: admin.database.Reference): Promise<any> {
        return (await ref.once('value')).exists()
    }

    /*
 Look up if any Object(s) exists in the Storage

 param:
     filename (string): filename of the Object

 Return:
     true : if any object(s) exists
     false: if any object(s) doesn't exists
 */
    async storage_exists(filename: string) {
        let data = await this.storage.file(this.root + "/" + filename).exists()
        return data[0]
    }

}

export default Firebase

