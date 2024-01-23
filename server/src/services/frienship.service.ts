import knexLibrary from "knex";
import knexConfig from "../../knexfile";
import { Friend, Friendship } from "../@types/models";
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
    //Check if friendship is present
    const existingFriendship = await knex("friendships")
      .select("*")
      .where({ ser1_id: senderId, user2_id: recipientId })
      .first();

    //friendship already exists
    if (existingFriendship) {
      return {
        createdId: undefined,
        errorMessage: "Friend request already pending!",
        isError: true,
      };
    }

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

//Get incoming friend requests
const getIncomingFriendshipRequests = async (
  userId: number
): Promise<{
  friendRequests: Friend[] | undefined;
  errorMessage: string | undefined;
  isError: boolean;
}> => {
  try {
    //Get Incoming friend requests
    const friendRequests = await knex("friendships")
      .join("users", "users.id", "=", "friendships.user1_id")
      .select(
        "users.username as username",
        "users.name as name",
        "friendships.id as friendship_id",
        "friendships.user1_id as friend_id",
        "users.seed as seed"
      )
      .where({ user2_id: userId, status: "pending" });

    return { friendRequests, errorMessage: undefined, isError: false };
  } catch (error: any) {
    console.error(
      redText(`Error updating user: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    return { friendRequests: undefined, errorMessage: error.message, isError: true };
  }
};

//Get friends
const getFriendships = async (
  userId: number
): Promise<{
  friends: Friend[] | undefined;
  errorMessage: string | undefined;
  isError: boolean;
}> => {
  try {
    //Get friendships
    const friends = await knex("friendships")
      .select(
        "users.username as username",
        "users.name as name",
        "users.seed as seed",
        "users.id as friend_id",
        "friendships.id as friendship_id"
      )
      .where((builder) => {
        builder.where({ user1_id: userId }).orWhere({ user2_id: userId });
      })
      .join("users", "users.id", "=", "friendships.user1_id")
      .orWhere("users.id", "=", "friendships.user2_id");

    return { friends, errorMessage: undefined, isError: false };
  } catch (error: any) {
    console.error(
      redText(`Error updating user: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    return { friends: undefined, errorMessage: error.message, isError: true };
  }
};

//Remove friendship

const removeFriendship = async (
  userId: number,
  friendId: number
): Promise<{
  isSuccess: boolean;
  errorMessage: string | undefined;
  isError: boolean;
}> => {
  try {
    //Delete friend
    const deletedRows = await knex("friendships")
      .where((builder) => {
        builder
          .where({ user1_id: userId, user2_id: friendId, status: "accepted" })
          .orWhere({ user1_id: friendId, user2_id: userId, status: "accepted" });
      })
      .delete();

    //Check for deletions
    if (deletedRows === 0)
      return { isSuccess: false, errorMessage: "Friendship not found", isError: false };

    return { isSuccess: true, errorMessage: undefined, isError: false };
  } catch (error: any) {
    console.error(
      redText(`Error deleting friendship: ${error.message} -- ${error.code}\n${error.sqlMessage}`)
    );
    return { isSuccess: false, errorMessage: error.message, isError: true };
  }
};

export default {
  requestFriendship,
  acceptFriendship,
  rejectFriendship,
  getIncomingFriendshipRequests,
  getFriendships,
  removeFriendship,
};
