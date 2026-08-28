# Belin7z

Site de perfil pessoal com tema roxo e partículas mágicas, avatar e nome do
Discord em tempo real, "Ouvindo agora" do Spotify com barra de progresso, e
atalhos para redes sociais.

Feito com Next.js (App Router), TypeScript, Tailwind CSS v4 e
[tsparticles](https://particles.js.org/). Os dados do Discord/Spotify vêm do
[Lanyard](https://github.com/Phineas/lanyard) — um serviço público e gratuito
que **não exige nenhum token de conta**, apenas o seu Discord User ID.

## Configuração

1. Entre no servidor do Lanyard: https://discord.gg/lanyard (obrigatório para
   o Lanyard conseguir ler sua presença).
2. No Discord, ative o **Modo Desenvolvedor** em
   Configurações > Avançado.
3. Clique com o botão direito no seu próprio perfil e escolha
   **Copiar ID do Usuário**.
4. Copie `.env.example` para `.env.local` e cole o ID:

   ```
   NEXT_PUBLIC_DISCORD_ID=seu_id_aqui
   ```

5. Para o "Ouvindo agora" do Spotify aparecer, conecte sua conta Spotify em
   Configurações do Discord > Conexões, e deixe "Mostrar nas atividades"
   ativado.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Deploy (Vercel)

```bash
vercel --prod
```

Lembre-se de configurar `NEXT_PUBLIC_DISCORD_ID` também nas
**Environment Variables** do projeto na Vercel.

## Estrutura do projeto

```
app/                   rotas (App Router), layout e estilos globais
components/
  particles/           fundo de partículas mágicas (tsparticles)
  profile/              avatar, nome exibido, status do Discord
  social/               ícones e links de redes sociais
  spotify/               widget "Ouvindo agora" com progresso
config/site.ts          nome do site, ID do Discord, links sociais
hooks/                  useLanyard (WebSocket em tempo real), useSpotifyProgress
lib/lanyard/            tipos, constantes e conexão WebSocket com o Lanyard
lib/time.ts             formatação de tempo (mm:ss)
```

## Redes sociais

Editáveis em [config/site.ts](config/site.ts).
