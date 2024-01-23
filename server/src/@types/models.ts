export interface User {
  id?: number;
  name: string;
  username: string;
  password: string;
  seed: string;
}

export interface Friendship {
  id: number;
  user1_id: number;
  user2_id: number;
  status: "pending" | "accepted";
  created_at: Date;
}

export interface Friend {
  username: string;
  name: string;
  friend_id: number;
  seed: string;
  friendship_id: string;
}
