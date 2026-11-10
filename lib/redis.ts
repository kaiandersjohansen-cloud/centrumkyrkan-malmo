// Minimal klient för Upstash Redis REST API, utan extra paket. Vercels
// Upstash-integration sätter KV_REST_API_URL och KV_REST_API_TOKEN automatiskt.

type Command = (string | number)[];

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export function redisConfigured(): boolean {
  return Boolean(URL_ && TOKEN);
}

async function post(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${URL_}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis svarade ${res.status}`);
  return res.json();
}

export async function redis<T = unknown>(...command: Command): Promise<T> {
  const data = (await post("", command)) as { result?: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result as T;
}

export async function pipeline(commands: Command[]): Promise<unknown[]> {
  if (!commands.length) return [];
  const data = (await post("/pipeline", commands)) as { result?: unknown; error?: string }[];
  return data.map((d) => {
    if (d.error) throw new Error(d.error);
    return d.result;
  });
}
