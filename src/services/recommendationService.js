import { supabase } from './supabaseClient';

export const getRecommendations = async () => {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recommendations from Supabase:', error);
    return [];
  }
  return data;
};

export const getTotalRecommendationsCount = async () => {
  const { count, error } = await supabase
    .from('recommendations')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching count from Supabase:', error);
    return 0;
  }
  return count;
};

export const addRecommendation = async (items) => {
  const insertData = Array.isArray(items) ? items : [items];
  
  const { data, error } = await supabase
    .from('recommendations')
    .insert(
      insertData.map(item => ({
        place_name: item.placeName,
        location: item.location,
        category: item.category,
        description: item.description,
        safety: item.safety,
        // recommended_by defaults to 1 based on DB schema
      }))
    )
    .select();

  if (error) {
    console.error('Error inserting recommendation(s) into Supabase:', error);
    throw error;
  }
  return data;
};
