'use client';

import { coreCollection } from "@/utils/constants/homeCollection";
import "./CoreCollection.css";
import Link from "next/link";

export default function CoreCollection() {

  return (
    <>
      <article className="main-collection-container">
        <h2>EXPLORATION DISCOVERY INNOVATION.</h2>
        <h3>Beyond The Stars!</h3>
        <p>Emerging in the world of technology, SpaceXplorer is dedicated to revolutionizing the customer experience. Our engineering team focuses on innovation and quality, ensuring that our line of products and services, including VR technology, experience sales, 3D printing, merchandising and loot boxes, deliver exceptional performance at affordable prices. SpaceXplorer, technology that transforms your world.</p>
        <p className="decoration">x</p>
      </article>

      <section className="core-collection-container">
        {coreCollection.map((item, index) => (
          <article key={index + "core collection"} className="collection-wrap">
            <Link href={item.url}>
              <img src={item.image} alt={item.title} loading="lazy" className="image-collection" />
            </Link>
            <Link href={item.url}>
              <p className="core-title">{item.title}</p>
            </Link>
            <p className="core-description">{item.description}</p>
          </article>
        ))}
      </section>
    </>
  )
}
