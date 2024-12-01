'use client';

import { Accordion, Burger, Drawer, Indicator, Text, VisuallyHidden } from "@mantine/core";
import "./BurgerMenu.css";
import { useDisclosure } from "@mantine/hooks";
import LanguageSelect from "./LanguageSelect";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { menuData } from "@/helpers/navbar";

interface Section {
  slug: string;
  items: string[];
}

interface GetAbsoluteUrlParams {
  section: Section;
  index: number;
}


export default function BurgerMenu() {
  const [openedBurger, { toggle }] = useDisclosure();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const cart = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.length);
  const { t } = useTranslation();

  // Helper function that construct the url to use absolute path aplies to megamenu
  const getAbsoluteUrl = ({ section, index }: GetAbsoluteUrlParams): string => {
    if (section.slug === 'whats-new') {
      return '/tag/whats-new';
    }

    const baseUrl: string = section.slug
        .toLowerCase()
        .replace(/ & /g, "-")
        .replace(/ /g, "-");

    if (index === 0) {
      return `/${baseUrl}`;
    }

    const subPath: string = section.items[index]
        .toLowerCase()
        .replace(/ & /g, "-")
        .replace(/ /g, "-");

    return `/${baseUrl}/${subPath}`;
  };

  useEffect(() => {
    setCartItems(cart.length);
  }, [cart]);

  const handleClick = () => {
    toggle();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
      <nav className={`burger-wrap ${isHidden ? "hidden" : "shown"}`} id="burger-menu-navbar" role="navigation">
        <div className={`burger-container ${isActive ? "active" : ""}`} id="drawer-burger-content">
          <div
              id="burger-button"
              onClick={handleClick}
              className={`${isActive ? "active" : ""}`}
              title="Toggle navigation"
              aria-expanded={isActive}
              aria-controls="drawer-burger-content"
              aria-label="Toggle navigation"
          >
            <Burger
                opened={openedBurger}
                aria-label="Toggle navigation"
                title="Toggle navigation"
                aria-labelledby="burger-button"
                size="sm"
                color="var(--white)"
            >
              {" "}
              <VisuallyHidden>Toggle navigation</VisuallyHidden>
            </Burger>
            {" "}{t("header.burger-menu")}
          </div>
          <Link href='/cart' className="burger-toggle" id="cart-link" aria-label="shopping cart" role="button">
            <Indicator
                color="#121212"
                size="xl"
                radius="xl"
                id="badge-cart-burger"
                label={cartItems}
                disabled={cartItems === 0}
                withBorder
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-shopping-cart shopping-cart-icon"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
              </svg>
            </Indicator>
          </Link>

          <div className="burger-toggle">
            <LanguageSelect />
          </div>

          {/* <button className="burger-toggle" name="user details button" aria-label="User Details Button"> */}
          {/* <Link to='/my-account' className="burger-toggle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} aria-label="Link to My Account" role="button" id="userIconTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-user user-icon"
            aria-labelledby="userIconTitle"
            role="img"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
          </svg>
          </Link> */}
          {/* </button> */}
        </div>

        <Drawer.Root
            opened={openedBurger}
            onClose={toggle}
            padding="md"
            position="bottom"
            size={"100%"}
            zIndex={50}
            className="drawer-root-burger"
        >
          <Drawer.Content id="drawer-burger-content">
            <Drawer.Header>
              <img
                  src="https://raw.githubusercontent.com/camilozv21/media-server-spaceXplorer/refs/heads/main/logo-bg.png"
                  alt="carson logo"
                  className="home-logo"
                  loading="lazy"
              />
              <Drawer.CloseButton onClick={handleClick} />
            </Drawer.Header>
            <Drawer.Body>
              {/* <div className="search-wrap-burger">
              <SearchBar searchContainer={'search-container-burger'} searchInput={'search-input-burger'} searchSubmit={'search-submit-burger'} />
            </div> */}

              <Accordion id="accordion-burger-menu">
                {menuData.map((section, index) => (
                    <Accordion.Item value={`section-${index}`} key={section.label + "accordion menu"}>
                      <Accordion.Control>
                        <Text>
                      <span
                          // to="https://www.google.com/?hl=es"
                          // onClick={(e) => e.stopPropagation()}
                          className="mega-menu-accordeon-title"
                      >
                        {t(`header.menu-data.${section.slug}.label`)}
                      </span>
                        </Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <ul className="mega-menu-accordeon">
                          {section.items.map((item, index) => (
                              <li key={index + "link burger menu"} className="list-item-wrapper">
                                <Link
                                    onClick={handleClick}
                                    // href={section.slug === 'whats-new'
                                    //     ? '/tag/whats-new'
                                    //     : index === 0
                                    //         ? `${t(`header.menu-data.${section.slug}.label-url`).toLocaleLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
                                    //         : `${t(`header.menu-data.${section.slug}.label-url`).toLocaleLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}/${t(`header.menu-data.${section.slug}.items-url.${index}`).toLocaleLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
                                    // }
                                    href={getAbsoluteUrl({section, index})}
                                    key={index + "link burger menu"}>
                                  <span className="item-burguermenu-span">{t(`header.menu-data.${section.slug}.items.${index}`)}</span>
                                </Link>
                              </li>
                          ))}
                        </ul>
                      </Accordion.Panel>
                    </Accordion.Item>
                ))}
              </Accordion>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </nav>
  );
};

