import knexLibrary from "knex";
import knexConfig from "../../knexfile";
import { Friendship } from "../@types/models";
import { redText } from "../config/misc";

const knex = knexLibrary(knexConfig);

//Request friendship
const requestFriendship = async (
  senderId: number,
  recipientId: number
): Promise<{
  createdId: number | undefined;
  errorMessage: string | undefined;
  isError: boolean;
}> => {
  try {
    //Create friendship
    const [createdId] = await knex("friendships").insert({
      user1_id: senderId,
      user2_id: recipientId,
    });

    return { createdId, errorMessage: undefined, isError: false };
  } catch (error: any) {
    console.error(
      redText(`Error updating user: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    return { createdId: undefined, errorMessage: error.message, isError: true };
  }
};

//Accept friendship
const acceptFriendship = async (
  friendshipId: number
): Promise<{
  friendship: Friendship | undefined;
  errorMessage: string | undefined;
  isError: boolean;
}> => {
  try {
    //Accept friendship
    await knex("friendships").where({ id: friendshipId }).update({ status: "accepted" });

    //Get updated friendship
    const friendship = (await knex("friendships")
      .where({ id: friendshipId })
      .select("*")
      .first()) as Friendship;

    return { friendship, errorMessage: undefined, isError: false };
  } catch (error: any) {
    console.error(
      redText(`Error updating user: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    return { friendship: undefined, errorMessage: error.message, isError: true };
  }
};

//Reject friendship
const rejectFriendship = async (
  friendshipId: number
): Promise<{
  isSuccess: boolean;
  errorMessage: string | undefined;
  isError: boolean;
}> => {
  try {
    await knex("friendships").where({ id: friendshipId }).delete();
    return { isSuccess: true, isError: false, errorMessage: undefined };
  } catch (error: any) {
    console.error(
      redText(`Error updating user: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    return { isSuccess: false, isError: true, errorMessage: error.message };
  }
};

//TODO:Get incoming friend requests

//TODO:Get friends

export default { requestFriendship, acceptFriendship, rejectFriendship };
