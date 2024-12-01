'use client';

import "./Header.css";
import MegaMenu from "./MegaMenu";
import LanguageSelect from "./LanguageSelect";
import BurgerMenu from "./BurgerMenu";
import { Indicator } from "@mantine/core";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Header() {
  const cart = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.length);
  const { i18n } = useTranslation();

  useEffect(() => {
    setCartItems(cart.length);
  }, [cart]);

  return (
    <>
      <header className="header-container" role="banner">
        <aside className="global-banner">
          <p className="global-banner-content">{`Beyond the Stars.™`}</p>
        </aside>
        <div className="container-widgets-header">
          <div className="header-wrapper">
            <nav className="header-widgets-container">
              <aside className="widget-area">
                <section className="lang-region-current">
                  <Link href={"/"} tabIndex={0}>
                    <picture className="picture-container">
                      <source
                        media="(min-width: 600px)"
                        srcSet='https://raw.githubusercontent.com/camilozv21/media-server-spaceXplorer/refs/heads/main/logo-bg.png'
                      />
                      <img
                        src='https://raw.githubusercontent.com/camilozv21/media-server-spaceXplorer/refs/heads/main/logo-bg.png'
                        alt="carson logo"
                        className="home-logo"
                        loading="lazy"
                      />
                    </picture>
                  </Link>

                  {/* <section id="menu-primary">
                  <div
                    id="mega-menu-wrap-max_mega_menu_1"
                    className="mega-menu-wrap"
                  >
                    <SearchBar searchContainer={'search-container-header'} searchInput={'search-input-header'} />
                  </div>
                </section> */}

                  <span className="mh-social-media-span">
                    <span className="mh-social-media-item">
                      <a
                        id="mh-social-media-link-instagram"
                        href="https://www.instagram.com/carsonoptical/"
                      >
                        <img
                          src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/instagram-icon2.png"
                          alt="instagram icon"
                          loading="lazy"
                        />
                      </a>
                    </span>
                    <span className="mh-social-media-item">
                      <a
                        id="mh-social-media-link-facebook"
                        href="https://www.facebook.com/carsonoptical"
                      >
                        <img
                          src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/facebook-icon2.png"
                          alt="facebook icon"
                          loading="lazy"
                        />
                      </a>
                    </span>
                    <span className="mh-social-media-item">
                      <a
                        id="mh-social-media-link-tiktok"
                        href="https://www.tiktok.com/@carsonoptical"
                      >
                        <img
                          src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/tiktok-icon2.png"
                          alt="tiktok icon"
                          loading="lazy"
                        />
                      </a>
                    </span>
                    <span className="mh-social-media-item">
                      <a
                        id="mh-social-media-link-youtube"
                        href="https://www.youtube.com/user/CarsonOptical"
                      >
                        <img
                          src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/youtube-icon2.png"
                          alt="youtube icon"
                          loading="lazy"
                        />
                      </a>
                    </span>
                    <span className="mh-social-media-item">
                      <a
                        id="mh-social-media-link-linkedin"
                        href="https://www.linkedin.com/company/carson-optical"
                      >
                        <img
                          src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/linkedin-icon2.png"
                          alt="linkedin icon"
                          loading="lazy"
                        />
                      </a>
                    </span>
                    <span className="mh-social-media-item">
                      <a
                        id="mh-social-media-link-pinterest"
                        href="https://co.pinterest.com/carsonoptical/"
                      >
                        <img
                          src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/pinterest-icon2.png"
                          alt="pinterest icon"
                          loading="lazy"
                        />
                      </a>
                    </span>
                  </span>

                  <Link href="/cart" className="cart-container">
                    <Indicator
                      color="rgba(83, 113, 147)"
                      size="xl"
                      radius="xl"
                      id="badge-cart"
                      label={cartItems}
                      disabled={cartItems === 0}
                      processing
                      zIndex={2}
                    >
                      <img src="https://api.carson.com/wp-content/uploads/2024/08/cart-icon-1.png" alt="cart icon" className="cart-icon" loading="lazy" />
                    </Indicator>
                  </Link>

                  {/* <Link to="/my-account" className="user-container-header" aria-label="User Details Button" role="button">
                  <IconUserFilled />
                </Link> */}

                  <div className="language-container-desktop">
                    <LanguageSelect />
                  </div>

                </section>
              </aside>
            </nav>
            <div className="separator"></div>
            <nav className="mega-menu-row-wrapper">
              <MegaMenu />
            </nav>
            <BurgerMenu />
          </div>
          <aside className="searchbar-mobile-container">
            {/* <SearchBar searchContainer={'search-container-header'} searchInput={'search-input-header'} /> */}
            <div className="header-widgets-university">
              <Link href='/company/contact' className="container-logo-mobile">
                <img className="support-image" src="https://media.carson.com/repository/img/chat-icon.png" alt="logo support carson" loading="lazy" width={50} height={50} />
              </Link>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
};
