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
      sessions: {
        Row: {
          id: string;
          username: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
        };
      };
      users: {
        Row: {
          is_admin: boolean | null;
          status: string | null;
          username: string;
        };
        Insert: {
          is_admin?: boolean | null;
          status?: string | null;
          username: string;
        };
        Update: {
          is_admin?: boolean | null;
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
