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
  
  for (const item of insertData) {
    const payload = {
      name: item.name || 'Anonymous',
      title: item.title || item.placeName || '',
      description: item.description || '',
      category: item.category || '',
      city: item.city || '',
      state: item.state || ''
    };

    console.log("FINAL RECOMMENDATION PAYLOAD:", payload);

    const { error } = await supabase
      .from('recommendations')
      .insert([payload]);

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      throw error;
    }
  }

  return true;
};
