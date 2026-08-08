/**
 * Form submissions for the partner application and contact form.
 *
 * Like everything else on this build these stay in the visitor's browser. The
 * point is that the form genuinely does something and says so honestly —
 * rather than the original's approach of faking a success state and silently
 * discarding the input.
 *
 * To make these reach a real inbox later, replace the body of `saveInquiry`
 * with a POST to a form endpoint (Formspree, Basin, a Cloudflare Worker) — the
 * calling components do not need to change.
 */

const INQUIRIES_KEY = 'hgl.inquiries.v1';

export function saveInquiry(kind, payload) {
  const record = {
    id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    ...payload,
    submittedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]');
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify([...existing, record]));
    return { record };
  } catch {
    return { error: 'Your browser is blocking local storage, so this could not be saved.' };
  }
}

export function getInquiries() {
  try {
    return JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]');
  } catch {
    return [];
  }
}
