# Belin7z

Meu perfil pessoal. Avatar e status do Discord em tempo real via Lanyard,
"ouvindo agora" do Spotify com barra em waveform, contador de visitas,
e um fundo de galáxia inteiro em canvas puro — sem tsparticles, sem
three.js, nada. Estrelas, nebulosas, cometas: tudo desenhado à mão em
`lib/galaxy` e `components/particles/GalaxyCanvas.tsx`.

Next.js (App Router) + TypeScript + Tailwind v4.

## Rodando local

1. Entra em https://discord.gg/lanyard (o Lanyard só lê sua presença se
   você estiver no servidor dele).
2. Ativa o Modo Desenvolvedor no Discord (Configurações > Avançado),
   clica com o botão direito no seu perfil e copia o ID do usuário.
3. Copia `.env.example` pra `.env.local` e cola o ID:

   ```
   NEXT_PUBLIC_DISCORD_ID=seu_id_aqui
   ```

4. Pra aparecer o "ouvindo agora", conecta o Spotify nas Conexões do
   Discord e deixa "Mostrar nas atividades" ligado.

```bash
npm install
npm run dev
```

O contador de visitas usa Redis (Upstash, via integração da Vercel). Sem
`KV_REST_API_URL` e `KV_REST_API_TOKEN` no `.env.local` ele só some da
tela — não quebra o resto.

## Deploy

```bash
vercel --prod
```

Configura `NEXT_PUBLIC_DISCORD_ID` (e as env vars do Redis, se for usar
o contador) nas Environment Variables do projeto na Vercel também.

## Estrutura

```
app/                  rotas, layout, globals.css, API do contador de visitas
components/
  particles/           galáxia em canvas + olho que pisca
  profile/              card, badges, easter egg, stats de visita
  spotify/               "ouvindo agora" + waveform
  audio/                  música ambiente com visualizador reagindo ao áudio
lib/lanyard/           tipos e conexão WebSocket com o Lanyard
lib/galaxy/            geração de estrelas e nebulosas
lib/redis.ts           cliente Upstash
hooks/                 useLanyard, useVisitCount, useSpotifyProgress...
config/site.ts         nome do site, ID do Discord, links sociais
```

## Redes sociais

Editáveis em [config/site.ts](config/site.ts).
