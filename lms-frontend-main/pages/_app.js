import Head from "next/head";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";
import { AuthProvider } from "../contexts/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Education Nest</title>
        {/*====== Favicon Icon ======*/}
        <link
          rel="shortcut icon"
          href=""
          // href="assets/images/favicon.png"
          type="image/x-icon"
        />
        {/*====== Google Fonts ======*/}
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/*====== Flaticon ======*/}
        <link rel="stylesheet" href="assets/css/flaticon.min.css" />
        {/*====== Font Awesome ======*/}
        <link rel="stylesheet" href="assets/css/font-awesome-5.9.0.min.css" />
        {/*====== Bootstrap ======*/}
        <link rel="stylesheet" href="/assets/css/bootstrap-4.5.3.min.css" />
        {/*====== Magnific Popup ======*/}
        <link rel="stylesheet" href="assets/css/magnific-popup.min.css" />
        {/*====== Nice Select ======*/}
        <link rel="stylesheet" href="assets/css/nice-select.min.css" />
        {/*====== jQuery UI ======*/}
        <link rel="stylesheet" href="assets/css/jquery-ui.min.css" />
        {/*====== Animate ======*/}
        <link rel="stylesheet" href="assets/css/animate.min.css" />
        {/*====== Slick ======*/}
        <link rel="stylesheet" href="assets/css/slick.min.css" />
        {/*====== Main Style ======*/}
        <link rel="stylesheet" href="assets/css/style.css" />
      </Head>
      {/* <!-- Google Tag Manager --> */}

      <Script
        id="google_tag_manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l] = w[l] || [];
          w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M486XCX');`
        }}
      ></Script>
      {/* <!-- End Google Tag Manager --> */}
      {loading && <div className="preloader" />}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M486XCX" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
      </noscript>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Fragment>
  );
}

export default MyApp;
