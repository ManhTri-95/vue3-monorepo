export type ApplicantCreatePayload = {
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  note?: string;
};

export type Applicant = ApplicantCreatePayload & {
  id: string;
  createdAt: string;
};

