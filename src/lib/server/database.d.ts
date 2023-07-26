export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      feedback: {
        Row: {
          feedbackType: string;
          message: string | null;
          timestamp: number;
          username: string;
        };
        Insert: {
          feedbackType: string;
          message?: string | null;
          timestamp: number;
          username: string;
        };
        Update: {
          feedbackType?: string;
          message?: string | null;
          timestamp?: number;
          username?: string;
        };
      };
      users: {
        Row: {
          status: string | null;
          username: string;
        };
        Insert: {
          status?: string | null;
          username: string;
        };
        Update: {
          status?: string | null;
          username?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
