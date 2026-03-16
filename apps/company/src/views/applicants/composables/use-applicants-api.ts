import { requestClient } from '#/api/request';
import type { Applicant, ApplicantCreatePayload } from '../schemas/applicants.schema';

function createLocalApplicant(payload: ApplicantCreatePayload): Applicant {
  const now = new Date().toISOString();
  const id =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { ...payload, id, createdAt: now };
}

const STORAGE_KEY = 'company.applicants';

function saveToLocalStorage(applicant: Applicant) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const current = raw ? (JSON.parse(raw) as Applicant[]) : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([applicant, ...current]));
}

export function useApplicantsApi() {
  async function createApplicant(payload: ApplicantCreatePayload) {
    const apiPath = import.meta.env.VITE_API_APPLICANTS_CREATE_PATH ?? '/applicants';

    try {
      return await requestClient.post<Applicant>(apiPath, payload);
    } catch {
      const fallback = createLocalApplicant(payload);
      saveToLocalStorage(fallback);
      return fallback;
    }
  }

  return { createApplicant };
}

