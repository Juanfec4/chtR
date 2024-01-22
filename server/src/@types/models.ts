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
