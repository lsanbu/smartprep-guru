export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      generated_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          difficulty_level: number | null
          explanation: string | null
          id: string
          mock_test_id: string | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_number: number
          question_text: string
          source_context: string | null
          subject: string
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          difficulty_level?: number | null
          explanation?: string | null
          id?: string
          mock_test_id?: string | null
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_number: number
          question_text: string
          source_context?: string | null
          subject: string
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          difficulty_level?: number | null
          explanation?: string | null
          id?: string
          mock_test_id?: string | null
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_number?: number
          question_text?: string
          source_context?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_questions_mock_test_id_fkey"
            columns: ["mock_test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_tests: {
        Row: {
          biology_questions: number | null
          chemistry_questions: number | null
          generated_at: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          physics_questions: number | null
          test_name: string
          test_type: string | null
          total_questions: number | null
        }
        Insert: {
          biology_questions?: number | null
          chemistry_questions?: number | null
          generated_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          physics_questions?: number | null
          test_name: string
          test_type?: string | null
          total_questions?: number | null
        }
        Update: {
          biology_questions?: number | null
          chemistry_questions?: number | null
          generated_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          physics_questions?: number | null
          test_name?: string
          test_type?: string | null
          total_questions?: number | null
        }
        Relationships: []
      }
      page_analytics: {
        Row: {
          created_at: string | null
          id: string
          is_chargeable: boolean | null
          last_visited: string | null
          page_url: string
          time_spent_minutes: number | null
          user_id: string | null
          visit_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_chargeable?: boolean | null
          last_visited?: string | null
          page_url: string
          time_spent_minutes?: number | null
          user_id?: string | null
          visit_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_chargeable?: boolean | null
          last_visited?: string | null
          page_url?: string
          time_spent_minutes?: number | null
          user_id?: string | null
          visit_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          alternate_contact_number: string | null
          class_studying: string
          contact_number: string
          created_at: string | null
          district: string
          father_mother_name: string
          id: string
          referral_details: string
          referral_source: Database["public"]["Enums"]["referral_source"]
          school_name: string
          school_place: string
          state: Database["public"]["Enums"]["indian_state"]
          student_name: string
          updated_at: string | null
        }
        Insert: {
          alternate_contact_number?: string | null
          class_studying: string
          contact_number: string
          created_at?: string | null
          district: string
          father_mother_name: string
          id: string
          referral_details: string
          referral_source: Database["public"]["Enums"]["referral_source"]
          school_name: string
          school_place: string
          state: Database["public"]["Enums"]["indian_state"]
          student_name: string
          updated_at?: string | null
        }
        Update: {
          alternate_contact_number?: string | null
          class_studying?: string
          contact_number?: string
          created_at?: string | null
          district?: string
          father_mother_name?: string
          id?: string
          referral_details?: string
          referral_source?: Database["public"]["Enums"]["referral_source"]
          school_name?: string
          school_place?: string
          state?: Database["public"]["Enums"]["indian_state"]
          student_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      question_responses: {
        Row: {
          attempt_id: string | null
          created_at: string | null
          id: string
          is_correct: boolean | null
          question_id: string | null
          selected_answer: string | null
          time_spent_seconds: number | null
        }
        Insert: {
          attempt_id?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string | null
          selected_answer?: string | null
          time_spent_seconds?: number | null
        }
        Update: {
          attempt_id?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string | null
          selected_answer?: string | null
          time_spent_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "question_responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "test_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "generated_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      test_attempts: {
        Row: {
          biology_score: number | null
          chemistry_score: number | null
          id: string
          mock_test_id: string | null
          physics_score: number | null
          started_at: string | null
          status: string | null
          submitted_at: string | null
          time_spent_minutes: number | null
          total_score: number | null
          user_id: string | null
        }
        Insert: {
          biology_score?: number | null
          chemistry_score?: number | null
          id?: string
          mock_test_id?: string | null
          physics_score?: number | null
          started_at?: string | null
          status?: string | null
          submitted_at?: string | null
          time_spent_minutes?: number | null
          total_score?: number | null
          user_id?: string | null
        }
        Update: {
          biology_score?: number | null
          chemistry_score?: number | null
          id?: string
          mock_test_id?: string | null
          physics_score?: number | null
          started_at?: string | null
          status?: string | null
          submitted_at?: string | null
          time_spent_minutes?: number | null
          total_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_mock_test_id_fkey"
            columns: ["mock_test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      url_configurations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_chargeable: boolean | null
          url_pattern: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_chargeable?: boolean | null
          url_pattern: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_chargeable?: boolean | null
          url_pattern?: string
        }
        Relationships: []
      }
      user_pricing_suggestions: {
        Row: {
          created_at: string | null
          id: string
          plan_type: Database["public"]["Enums"]["pricing_plan"]
          suggested_price: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_type: Database["public"]["Enums"]["pricing_plan"]
          suggested_price?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_type?: Database["public"]["Enums"]["pricing_plan"]
          suggested_price?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      indian_state:
        | "Andhra Pradesh"
        | "Arunachal Pradesh"
        | "Assam"
        | "Bihar"
        | "Chhattisgarh"
        | "Goa"
        | "Gujarat"
        | "Haryana"
        | "Himachal Pradesh"
        | "Jharkhand"
        | "Karnataka"
        | "Kerala"
        | "Madhya Pradesh"
        | "Maharashtra"
        | "Manipur"
        | "Meghalaya"
        | "Mizoram"
        | "Nagaland"
        | "Odisha"
        | "Punjab"
        | "Rajasthan"
        | "Sikkim"
        | "Tamil Nadu"
        | "Telangana"
        | "Tripura"
        | "Uttar Pradesh"
        | "Uttarakhand"
        | "West Bengal"
        | "Andaman and Nicobar Islands"
        | "Chandigarh"
        | "Dadra and Nagar Haveli and Daman and Diu"
        | "Delhi"
        | "Jammu and Kashmir"
        | "Ladakh"
        | "Lakshadweep"
        | "Puducherry"
      pricing_plan:
        | "Basic Plan"
        | "Standard Plan"
        | "Premium Plan"
        | "Ultimate Plan"
      referral_source:
        | "Social Media"
        | "Google Search"
        | "Friend/Family Reference"
        | "School Teacher"
        | "Coaching Institute"
        | "YouTube"
        | "Educational Website"
        | "Advertisement"
        | "Other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      indian_state: [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry",
      ],
      pricing_plan: [
        "Basic Plan",
        "Standard Plan",
        "Premium Plan",
        "Ultimate Plan",
      ],
      referral_source: [
        "Social Media",
        "Google Search",
        "Friend/Family Reference",
        "School Teacher",
        "Coaching Institute",
        "YouTube",
        "Educational Website",
        "Advertisement",
        "Other",
      ],
    },
  },
} as const
