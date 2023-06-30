import localFont from "next/font/local";

const adihausDIN = localFont({
  src: "../../public/fonts/AdihausDIN-Regular.ttf",
  variable: "--font-adihaus",
  display: "block", // change to auto or swap if taking too long to load
});

const adineuePRO = localFont({
  src: "../../public/fonts/adineuePRO-Regular.otf",
  variable: "--font-adineue",
  display: "block", // change to auto or swap if taking too long to load
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${adihausDIN.variable} ${adineuePRO.variable}`}>
      <head>
        <title>adidas All Blacks 2023 Rugby World Cup jersey</title>
        <meta
          name="description"
          content="All Blacks 2023 Rugby World Cup jersey"
        />
        <link rel="icon" href="/svg/adi_logo_white.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
