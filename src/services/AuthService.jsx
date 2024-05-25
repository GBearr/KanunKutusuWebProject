import supabase from "./supabaseClient";
import User from "../Models/userModel";

export const authService = {
  signInWithEmailAdressAndPassword: async (p_email_address, p_password) => {
    if (!p_email_address || !p_password) {
      throw new Error("Email and password are required");
    }

    let { data, error } = await supabase.rpc(
      "sign_in_with_email_address_and_password",
      {
        p_email_address,
        p_password,
      }
    );
    if (error) throw error;
    return User.fromJSON(data[0]);
  },

  signInWithUsernameAndPassword: async (p_username, p_password) => {
    if (!p_username || !p_password) {
      throw new Error("Username and password are required");
    }

    let { data, error } = await supabase.rpc(
      "sign_in_with_username_and_password",
      {
        p_username,
        p_password,
      }
    );
    if (error) throw error;
    return User.fromJSON(data[0]);
  },
};
