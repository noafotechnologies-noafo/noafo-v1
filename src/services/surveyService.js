import { supabase } from './supabaseClient';

export const submitSurvey = async (data) => {
  try {
    const payload = {
      answer_one: data.answer_one || null,
      answer_two: data.answer_two || null
    };

    console.log("FINAL PAYLOAD SENT:", payload);

    const { error } = await supabase
      .from('survey_responses')
      .insert([
        {
          answer_one: data.answer_one || null,
          answer_two: data.answer_two || null
        }
      ]);

    if (error) {
      console.error("FINAL SUPABASE ERROR:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected Error:", err);
    return { success: false, error: err };
  }
};
