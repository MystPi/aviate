export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
        Relationships: [];
      };
      reports: {
        Row: {
          created_at: string | null;
          id: number;
          reported_by: string;
          user: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          reported_by: string;
          user: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          reported_by?: string;
          user?: string;
        };
        Relationships: [];
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
        Relationships: [];
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
