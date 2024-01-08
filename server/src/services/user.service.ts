import knexLibrary from "knex";
import knexConfig from "../../knexfile";
import { User } from "../@types/models";
import { redText } from "../config/misc";

const knex = knexLibrary(knexConfig);

// Create user
const createUser = async (
  username: string,
  name: string,
  password: string,
  seed: string
): Promise<{
  isError: boolean;
  createdId: number | undefined;
  errorMessage: string | undefined;
  errNo: undefined | number;
}> => {
  //Error message
  let errorMessage: undefined | string = undefined;
  let errNo: undefined | number = undefined;

  try {
    // Create user
    let user: User = { username, name, password, seed };

    // Insert user to DB
    let [createdId] = await knex("users").insert(user);

    // Return status
    if (createdId !== undefined) {
      return { isError: false, createdId, errorMessage, errNo };
    }
  } catch (error: any) {
    // Handle errors
    console.error(
      redText(`Error creating user: ${error.code} -- ${error.errno}\n${error.sqlMessage}`)
    );
    errorMessage = error.code;
    errNo = error.errno;
  }

  // No user created
  return { isError: true, createdId: undefined, errorMessage, errNo };
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

//Update user
const updateUser = async (
  userId: string,
  changes: { newSeed?: string; newName?: string }
): Promise<{
  isError: boolean;
  errorMessage: string | undefined;
  user: User | undefined;
  errNo: number | undefined;
}> => {
  let errorMessage: undefined | string = undefined;
  let user: User | undefined;
  let errNo: undefined | number = undefined;

  try {
    await knex.transaction(async (trx) => {
      // Fetch user
      user = await trx("users").select("*").where("id", userId).first();

      // Invalid user id
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      // Update user
      await trx("users")
        .update({ name: changes.newName || user.name, seed: changes.newSeed || user.seed })
        .where("id", userId);

      // Refetch user
      user = await trx("users").select("*").where("id", userId).first();
    });

    return { isError: false, errorMessage, user, errNo };
  } catch (error: any) {
    console.error(
      redText(`Error updating user: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    errorMessage = error.errorMessage;
    errNo = error.errno;
    return { isError: true, errorMessage, user: undefined, errNo };
  }
};

export default { createUser, getUserByUsername, updateUser };
