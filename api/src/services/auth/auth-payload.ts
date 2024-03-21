export interface AuthPayload {
  id: string;
  permissions?: string[];
  roles?: string[];
  readonly iat?: number;
  readonly exp?: number;
}
