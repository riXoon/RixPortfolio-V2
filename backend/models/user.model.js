import supabase from "../config/supabase.js";

export const findByEmail = async (email) => {
    const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
}

export const createUser = async (email, passwordHash) => {
    const { data, error } = await supabase
        .from('admin_users')
        .insert({ email, password_hash: passwordHash })
        .select()
        .single()
    if (error) throw error
    return data
}
