// Load Firebase modules
import * as admin from 'firebase-admin'

const serviceAccount = require('./serviceaccount.json')

/*
A Class to initialize a connection to the fire(data)base
the database is pre-set on: "https://headless-cms-15c61.firebaseio.com"
the credentials are pre-set based on the firebase serviceaccount
*/
class Firebase {

    // Root-Destination (e.g. 'Space', 'Content', ...)
    root: string;

    // Constructor to initialize the database connection
    constructor(root: string) {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://headless-cms-15c61.firebaseio.com"
        });

        this.root = root
    }


    /*
    Read Data from the Reference

    param:
        id (string - optional) : fetch object(s) by the given id
        [no id given = all objects under the reference]

    return:
        object : the data stored behind the reference 
    */
    async read(id: string = "") {
        let ref = this.ref(id)
        if (await this.exists(ref)) {
            return (await ref.once('value')).val()
        } else {
            console.log(`[ERROR]: Read - Object with ID ${id} doesn't exists`)
        }

    }


    /*
    Insert Data into the reference

    param:
        new_id (string): the new given id
        key_values (object): the data to be stored
    */
    async insert(new_id: string, key_values: object) {
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
    Remove Data from the reference

    param:
        id (string): the object to be removed
    */
    async remove(id: string) {
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
    Update Data within the reference

    param:
        id (string): the object to be update
        key_vaues (object): the data to replace
    */
    async update(id: string, key_values: object) {
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
}


export default Firebase

