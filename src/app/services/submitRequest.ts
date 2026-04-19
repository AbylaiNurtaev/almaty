export type SubmitRequestInput = {
  title: string;
  source: string;
  payload: unknown;
};

type SubmitRequestResponse = {
  message: string;
  emailId?: string;
};

const DEFAULT_API_BASE_URL = "https://club-back-production.up.railway.app";

function getApiBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  return base && base.length > 0 ? base.replace(/\/+$/, "") : DEFAULT_API_BASE_URL;
}

export async function submitRequest(input: SubmitRequestInput): Promise<SubmitRequestResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/submit-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const json = (await response.json().catch(() => null)) as SubmitRequestResponse | null;
  if (!response.ok) {
    throw new Error(json?.message || "Не удалось отправить заявку");
  }

  return json ?? { message: "Заявка успешно отправлена" };
}
