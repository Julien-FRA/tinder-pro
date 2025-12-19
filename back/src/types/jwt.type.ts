export type JwtPayload = {
  sub: string;
  email: string;
  role: 'candidate' | 'recruiter';
};
