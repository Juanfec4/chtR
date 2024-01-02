import knexLibrary from "knex";
import knexConfig from "../../knexfile";
import { User } from "../@types/models";
import { redText } from "../config/misc";

const knex = knexLibrary(knexConfig);

// Create user
const createUser = async (
  username: string,
  name: string,
  password: string
): Promise<{
  isError: boolean;
  createdId: number | undefined;
  errorMessage: string | undefined;
}> => {
  //Error message
  let errorMessage: undefined | string = undefined;

  try {
    // Create user
    let user: User = { username, name, password };

    // Insert user to DB
    let [createdId] = await knex("users").insert(user);

    // Return status
    if (createdId !== undefined) {
      return { isError: false, createdId, errorMessage };
    }
  } catch (error: any) {
    // Handle errors
    console.error(
      redText(`Error creating user: ${error.code} -- ${error.errno}\n${error.sqlMessage}`)
    );
    errorMessage = error.code;
  }

  // No user created
  return { isError: true, createdId: undefined, errorMessage };
};

//Get user by username
const getUserByUsername = async (
  username: string
): Promise<{ isError: boolean; user: User | undefined; errorMessage: string | undefined }> => {
  //Error message
  let errorMessage: undefined | string = undefined;

  try {
    //Find user
    let user = await knex("users").select("*").where("username", username).first();

    return { isError: false, user, errorMessage };
  } catch (error: any) {
    // Handle errors
    console.error(
      redText(`Error authorizing user: ${error.code} -- ${error.errno}\n${error.sqlMessage}`)
    );
    errorMessage = error.code;
  }
  return { isError: true, user: undefined, errorMessage };
};

export default { createUser, getUserByUsername };
