import supabase from "../config/supabase.js";

const TABLE = 'projects'

export const getAll = async() => {
    const {data, error} = await supabase
        .from(TABLE)
        .select('*')
        .order('created_at', {ascending: false})

    if(error) throw error
    return data
}

export const getBySlug = async (slug) => {
    const {data, error} = await supabase
        .from(TABLE)
        .select('*')
        .eq('slug', slug)
        .single()
    if(error && error.code !== 'PGRST116') throw error
    return data
}

export const getById = async(id) => {
    const {data, error} = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', id)
        .single()
    if(error && error.code !== 'PGRST116') throw error
    return data
}

//CRUD operations
export const create = async(projects) => {
    const{data, error} = await supabase
        .from(TABLE)
        .insert(projects)
        .select()
        .single()
    if(error) throw error
    return data
}

export const update = async(id, fields) => {
    const {data, error} = await supabase
        .from(TABLE)
        .update(fields)
        .eq('id', id)
        .select()
        .single()
    if(error && error.code !== 'PGRST116') throw error
    return data
}

export const remove = async(id) => {
    const {data, error} = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)
    .select()
    .single()
    if(error && error.code !== 'PGRST116') throw error
    return data
}

