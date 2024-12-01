'use client';

import { Button, FocusTrapInitialFocus, Input, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalRoot, ModalTitle } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import './Footer.css';
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { menuData } from "@/helpers/footer";

export default function Footer() {
  const isMedScreen = useMediaQuery("(min-width: 881px) and (max-width: 1000px)");
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: ['email'],
    initialValues: { email: '' },
    validate: {
      email: (value) => (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? 'Invalid Email' : null)
    }
  });

  const handleNewsLetterSubmit = async () => {
    try {
      setLoading(true);

      const response = { is_valid: true };

      if (!response?.is_valid) {
        throw new Error('Network response was not ok');
      }

      open();
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const clearForm = () => {
    form.reset();
    close();
  }

  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-wrap">
        <aside className="footer-widgets">
          <section className="widget-nav-menu" id="section-with-carson-logo">
            <div className="carson-logo-container-footer">
              <Image src="https://raw.githubusercontent.com/camilozv21/media-server-spaceXplorer/refs/heads/main/rockect-bg.png" alt="carson logo" placeholder="blur" width={500} height={500} blurDataURL="https://api.carson.com/wp-content/uploads/2024/08/carson_mountains.png" />
            </div>
          </section>
          {menuData.map((section) => (
            <section className="widget-nav-menu" key={section.title}>
              <h3 className="caption-footer">{t(`footer.menu-data.${section.refference}.title`)}</h3>
              <ul className="list-nav">
                {section.items.map((item, index) => (
                  <li key={item.name}>
                    <Link href={item.path === 'where-to-buy' ? `/customers/${item.path}` : `${section.basePath}/${item.path}`}>
                      <span className="item-footer-content">{t(`footer.menu-data.${section.refference}.items.${index}.name`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {section.title === 'STAY CONNECTED' && (
                <>
                  <div className="container-stay-connected">
                    <div className="input-wrapper-suscribe">
                      <form onSubmit={form.onSubmit(handleNewsLetterSubmit)}>
                        <Input
                          radius="xs"
                          placeholder="your@email.com"
                          rightSectionPointerEvents="all"
                          rightSectionWidth={'auto'}
                          key={form.key('email')}
                          {...form.getInputProps('email')}
                          rightSection={<Button type="submit" loading={loading} autoContrast={true} variant="filled" color="#d6d6d6" style={{ display: isMedScreen ? 'none' : undefined }}>{t('footer.subscribe')}</Button>}
                        />
                      </form>
                    </div>

                    <span className="social-media">
                      <span>
                        <a
                          href="https://www.instagram.com/carsonoptical/"
                        >
                          <Image
                            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/instagram-icon2.png"
                            alt="instagram icon"
                            width={24}
                            height={24}
                          />
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://www.facebook.com/carsonoptical"
                        >
                          <Image
                            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/facebook-icon2.png"
                            alt="facebook icon"
                            width={24}
                            height={24}
                          />
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://www.tiktok.com/@carsonoptical"
                        >
                          <Image
                            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/tiktok-icon2.png"
                            alt="tiktok icon"
                            width={24}
                            height={24}
                          />
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://www.youtube.com/user/CarsonOptical"
                        >
                          <Image
                            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/youtube-icon2.png"
                            alt="youtube icon"
                            width={24}
                            height={24}
                          />
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://www.linkedin.com/company/carson-optical"
                        >
                          <Image
                            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/linkedin-icon2.png"
                            alt="linkedin icon"
                            width={24}
                            height={24}
                          />
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://co.pinterest.com/carsonoptical/"
                        >
                          <Image
                            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/pinterest-icon2.png"
                            alt="pinterest icon"
                            width={24}
                            height={24}
                          />
                        </a>
                      </span>
                    </span>
                    <div className="button-suscribe-container">
                      <Button autoContrast={true} variant="filled" color="#d6d6d6">Subscribe</Button>
                    </div>
                  </div>
                </>
              )}
            </section>
          ))}
        </aside>
      </div>
      <div className="footer-area-widgets">
        <aside className="widget-container">
          <section className="widget-text">
            <div className="copyright-container">
              <span>© 2024 Carson Optical, Inc.</span>
              <span>{t("footer.bottom.copyright")}</span>
            </div>
            <nav className="nav-copyright">
              <ul className="navbar-copyright">
                <li>
                  <Link href='/cookie-policy'>{t("footer.bottom.cookies")}</Link>
                </li>
                <li>
                  <Link href='/privacy-policy'>{t("footer.bottom.privacy")}</Link>
                </li>
                <li>
                  <Link href='/terms-conditions'>{t("footer.bottom.terms")}</Link>
                </li>
                <li>
                  <Link href='/track-order'>{t("footer.bottom.track")}</Link>
                </li>
                <li>
                  <Link href='/my-account'>{t("footer.bottom.account")}</Link>
                </li>
              </ul>
            </nav>

          </section>
        </aside>
      </div>
      <ModalRoot opened={opened} lockScroll={false} keepMounted={false} onClose={clearForm} id="modal-newsletter-home">
        <ModalOverlay style={{
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(3px)',
        }} />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              <b className="modal-title-newsletter">News & Insights <br /> <span className="modal-subtitle-newsletter">Expert Advice & Insights You Can Use</span></b>
            </ModalTitle>
            <ModalCloseButton icon={<IconSquareRoundedXFilled width="48" height="48" />} />
          </ModalHeader>
          <ModalBody>
            <FocusTrapInitialFocus />
            <div className="form-submitted">
              <b>Thank you for subscribing!</b>
              <p className="modal-description">Stay connected and be the first to hear about new features, special offers, industry trends, and exclusive content.</p>
              <div className="button-submit-newsletter-container">
                <Button onClick={clearForm} variant="filled" color="#121212" size="md" radius="md" fullWidth>Close</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </ModalRoot>
    </footer>
  )
}
