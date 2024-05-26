import supabase from "./supabaseClient";
import User from "../Models/userModel";

export const userService = {
  getUsers: async (p_user_id) => {
    let { data, error } = await supabase.rpc("get_user", {
      p_user_id,
    });
    if (error) console.error(error);
    return User.fromJSON(data[0]);
  },
};
