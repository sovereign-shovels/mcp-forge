/**
 * Sovereign Provider Contract — mcp-forge
 * =======================================
 * OpenAI-compatible chat completions client.
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ProviderConfig {
  name: string;
  endpoint: string;
  apiKeyEnvVar?: string;
  model: string;
}

export class Provider {
  readonly config: ProviderConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
  }

  static fromEnv(prefix: string, defaults: Partial<ProviderConfig> = {}): Provider {
    const env = (k: string) => process.env[`${prefix}_${k}`];
    const endpoint = env('ENDPOINT') || defaults.endpoint || 'http://localhost:11434/v1';
    const model = env('MODEL') || defaults.model || 'llama3.2';
    const apiKeyEnvVar = env('API_KEY_ENV') || defaults.apiKeyEnvVar;
    const name = env('NAME') || defaults.name || 'local';
    return new Provider({ name, endpoint, apiKeyEnvVar, model });
  }

  private getApiKey(): string | undefined {
    if (!this.config.apiKeyEnvVar) return undefined;
    return process.env[this.config.apiKeyEnvVar];
  }

  async chat(messages: ChatMessage[], opts: { temperature?: number; maxTokens?: number } = {}): Promise<string> {
    const apiKey = this.getApiKey();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const res = await fetch(`${this.config.endpoint}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: opts.temperature ?? 0.7,
        max_tokens: opts.maxTokens,
        stream: false,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Provider error (${res.status}): ${text}`);
    }

    const json = await res.json() as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
    if (json.error) throw new Error(`Provider error: ${json.error.message || JSON.stringify(json.error)}`);
    const content = json.choices?.[0]?.message?.content;
    if (content === undefined) throw new Error('Provider returned empty response');
    return content;
  }
}
