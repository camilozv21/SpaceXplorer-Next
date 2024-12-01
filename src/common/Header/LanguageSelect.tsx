'use client';

import "./LanguageSelect.css";
import { Menu, NativeSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDisclosure } from "@mantine/hooks";
import { languages, places } from "@/helpers/navbar";
import { updateGeoInfo } from "@/lib/features/geoInfo/geoInfo";
import { useAppDispatch } from "@/lib/hooks";

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [menuOpened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    const storedRegion = localStorage.getItem("selectedRegion");
    if (storedLanguage && storedRegion) {
      setSelectedLanguage(storedLanguage);
      setSelectedRegion(storedRegion);
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleUpdateGeoInfo = () => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
    localStorage.setItem("selectedRegion", selectedRegion);

    const userGeo = Cookies.get('user_geo');
    const existingData = userGeo ? JSON.parse(userGeo) : {};
    dispatch(updateGeoInfo({ language: selectedLanguage, region: selectedRegion }));

    const newData = {
      ...existingData,
      region: selectedRegion,
      language: selectedLanguage
    };
    Cookies.set('user_geo', JSON.stringify(newData), { expires: 7 });

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${selectedLanguage};expires=${expires};path=/`;

    if (currentLocale === "en") {
      router.push('/' + selectedLanguage + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${selectedLanguage}`));
    }

    router.refresh();
    close();
  };

  return (
    <Menu
      id="language-select"
      offset={0}
      position="bottom-start"
      trigger="click"
      shadow="md"
      closeOnItemClick={false}
      width={200}
      radius={'lg'}
      opened={menuOpened} 
      onOpen={open} 
      onClose={close}
    >
      <Menu.Target>
        <span onClick={open} className="select-language-container" aria-label="select language" role="button">
          <img
            src="https://api.carson.com/wp-content/themes/twentytwentyfour/img/globe-white.png"
            alt="select language"
            className="home-select-language-mobile"
            width={20}
            height={20}
            id="language-select-dropdown"
          />
        </span>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <form>
            <NativeSelect
              onChange={(e) => setSelectedLanguage(e.target.value)}
              rightSection={
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              }
              data={languages.map((lang) => ({
                ...lang,
              }))}
              mt="md"
              value={selectedLanguage}
            />

            {/* <NativeSelect
              onChange={(e) => setSelectedRegion(e.target.value)}
              rightSection={
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              }
              data={places}
              mt="md"
              value={selectedRegion}
            /> */}

            <div className="button-submit-container">
              <a type="button" className="button-submit" onClick={handleUpdateGeoInfo}>{t('header.language-select').toLocaleUpperCase()}</a>
            </div>
          </form>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSelect;