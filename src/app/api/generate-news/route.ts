import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const { provider } = await req.json();

    const prompt = `
      Você é um jornalista financeiro sênior especializado no mercado brasileiro. Escreva um artigo completo, longo e aprofundado sobre um dos seguintes temas (escolha aleatoriamente um para não repetir): 
      - Mercado financeiro no Brasil e tendências.
      - Ações de investimento e bolsa de valores (B3).
      - Desafios e novidades para empresas nacionais brasileiras.
      - Impactos econômicos globais na economia brasileira.
      
      O tom deve ser profissional, jornalístico, engajador e trazer dados ou análises ricas. No final do texto de forma sutil, lembre o leitor que ter uma boa gestão e um BPO Financeiro (como os serviços da Athos) ajuda as empresas a passarem por essas flutuações com segurança.
      
      Regras Visuais (MUITO IMPORTANTE):
      1. Para o campo "image" (imagem da capa), crie uma URL do gerador de imagens baseado no tema da sua notícia em inglês, usando este formato EXATO:
      https://image.pollinations.ai/prompt/professional+photo+of+{keywords_in_english}?width=800&height=500&nologo=true
      (Exemplo: https://image.pollinations.ai/prompt/professional+photo+of+sao+paulo+stock+exchange+brazil+finance?width=800&height=500&nologo=true)
      
      2. Dentro do campo "content", crie um texto longo dividido por vários <h2> e <h3>. 
      
      Regras de Formatação JSON (CRÍTICO):
      - A resposta deve ser APENAS um JSON válido. Não adicione crases (\`\`\`) nem a palavra json.
      - NÃO QUEBRE LINHAS DENTRO DAS STRINGS DO JSON. O HTML do "content" deve ser gerado todo em uma ÚNICA LINHA contínua, sem usar a tecla 'enter'. Se precisar quebrar linha, use a tag <br> ou escape usando \\n.
      - Escape todas as aspas duplas internas dentro do HTML usando barra invertida (\\").

      Formato esperado:
      {
        "id": "um-id-unico-kebab-case",
        "slug": "um-id-unico-kebab-case",
        "category": "AÇÕES / MERCADO / ECONOMIA",
        "title": "Título jornalístico e impactante",
        "summary": "Um resumo intrigante de 3 linhas",
        "image": "a url da imagem principal do pollinations",
        "content": "todo o conteúdo HTML longo em uma linha contínua, sem quebras reais"
      }
    `;

    let textResponse = '';

    if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY não configurada no .env.local' }, { status: 500 });
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: prompt,
      });
      textResponse = response.text || '';
    } 
    else if (provider === 'openai') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: 'OPENAI_API_KEY não configurada no .env.local' }, { status: 500 });
      const openai = new OpenAI({ apiKey });
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      });
      textResponse = response.choices[0].message.content || '';
    }
    else if (provider === 'groq') {
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) return NextResponse.json({ error: 'GROQ_API_KEY não configurada. Crie grátis em console.groq.com' }, { status: 500 });
      const groq = new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' });
      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
      });
      textResponse = response.choices[0].message.content || '';
    }
    else {
      return NextResponse.json({ error: 'Provedor de IA inválido' }, { status: 400 });
    }

    // Clean up potential markdown formatting around JSON
    if (textResponse.startsWith('```json')) {
      textResponse = textResponse.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (textResponse.startsWith('```')) {
      textResponse = textResponse.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const postData = JSON.parse(textResponse.trim());

    // Read existing posts
    const filePath = path.join(process.cwd(), 'src/data/posts.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const posts = JSON.parse(fileData);

    // Add new post to the beginning
    posts.unshift(postData);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true, post: postData });
  } catch (error) {
    console.error('Error generating news:', error);
    return NextResponse.json({ error: error.message || 'Falha ao gerar notícia' }, { status: 500 });
  }
}
