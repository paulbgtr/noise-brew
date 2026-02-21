// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Noise Brew</title>
          <meta
            name="description"
            content="Blend ambient soundscapes and tune your perfect focus mix."
          />
          <meta name="theme-color" content="#0f172a" />
          <meta property="og:title" content="Noise Brew" />
          <meta
            property="og:description"
            content="Blend ambient soundscapes and tune your perfect focus mix."
          />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
