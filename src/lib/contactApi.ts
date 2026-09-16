export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  company?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export async function submitContactForm(
  submission: ContactSubmission,
): Promise<ContactSubmissionResponse> {
  const response = await fetch(`${apiBaseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });

  const result = (await response.json().catch(() => null)) as ContactSubmissionResponse | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'We could not send your message. Please try again.');
  }

  return result;
}