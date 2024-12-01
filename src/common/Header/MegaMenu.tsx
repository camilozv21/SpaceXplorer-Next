'use client';

import { Menu, Paper } from "@mantine/core";
import "./MegaMenu.css";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { menuData } from "@/helpers/navbar";

interface Category {
  slug: string;
  items: string[];
  label: string
}

interface GetAbsoluteUrlParams {
  category: Category;
  index: number;
}

const MegaMenu = () => {
  const { t } = useTranslation();

  // Helper function that construct the url to use absolute path also applies to burger menu
  const getAbsoluteUrl = ({ category, index }: GetAbsoluteUrlParams): string => {
    if (category.slug === 'whats-new') {
      return '/tag/whats-new';
    }

    const baseUrl: string = category.slug
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");

    if (index === 0) {
      return `/${baseUrl}`;
    }

    const subPath: string = category.items[index]
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");

      return `/${baseUrl}/${subPath}`;
  };

  return (
    <div className="category-labels-megamenu" role="navigation">
      {menuData.map((category: Category) => (
        <Menu
          key={category.slug}
          id='mega-menu'
          trigger="click-hover"
          shadow="md"
          position="bottom"
          offset={0}
          openDelay={100}
          closeDelay={30}
          closeOnClickOutside
          closeOnEscape
          closeOnItemClick
        >
          <Menu.Target>
            <div>
              <Link
                role="button"
                className="categories-anchor-megamenu"
                id={`mega-menu-dropdown${category.slug === 'whats-new' ? `-${category.slug}` : ''}`}
                href={category.slug === 'whats-new' ? '/tag/whats-new' : '#'}
              >
                {category.label}
              </Link>
            </div>
          </Menu.Target>
          {category.slug !== "whats-new" && (
            <Menu.Dropdown>
              <Paper p="md" className="paper-menu">
                {category.items.map((item: string, index: number) => (
                  <Link
                    href={getAbsoluteUrl({ category, index })}
                    key={`${index}-link-in-megamenu`}
                  >
                    <Menu.Item>
                      {item}
                    </Menu.Item>
                  </Link>
                ))}
              </Paper>
            </Menu.Dropdown>
          )}
        </Menu>
      ))}
    </div>
  );
};

export default MegaMenu;
