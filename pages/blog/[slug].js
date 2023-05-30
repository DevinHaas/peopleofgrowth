import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import siteConfig from "@/config/site.config.json";
import {getAuthors} from "@/libs/getAuthors";
import {formatDate} from "@/utils/formatDate";
import {readingTime} from "@/utils/readingTime";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandTwitter,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons-react";
import fs from "fs";
import matter from "gray-matter";
import {marked} from "marked";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import React from "react";
import {useTheme} from "next-themes";

export default function PostPage({
  slug,
  content,
  frontMatter: { title, date, image, description, tags }
})
{

  const { theme, setTheme, resolvedTheme } = useTheme();

  let pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;
  return (
    <Layout metaTitle={title} metaDescription={description} ogImage={image}>
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <h3 className="h1 mb-4 post-title">{title}</h3>

                <ul className="card-meta list-inline mb-2">
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconClock size={18} />
                    </i>
                    <span>{readingTime(content)} min read</span>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconCalendarEvent size={18} />
                    </i>
                    <span>{formatDate(date)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-5 text-center post-deatils-image">
                <Image
                  className="rounded w-25 h-auto"
                  src={image}
                  alt={title}
                  width={`1120`}
                  height={`595`}
                  placeholder="blur"
                  blurDataURL={image}
                />
              </div>
            </div>
            <div className="col-lg-2 post-share-block order-1 order-lg-0 mt-5 mt-lg-0">
              <div className="position-sticky" style={{ top: 150 + "px" }}>
                <span className="d-inline-block mb-3 small">SHARE</span>
                <ul className="social-share icon-box">
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandTwitter size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.facebook.com/sharer.php?u=${pageUrl}&quote=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandFacebook size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandLinkedin size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.reddit.com/submit?url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandReddit size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.pinterest.com/pin/create/button/?&text=${title}&url=${pageUrl}&description=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandPinterest size={18} />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 post-content-block order-0 order-lg-2">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
              ></div>
              <div className="text-center">
                <Image
                    className="rounded w-25 h-auto"
                    src={
                      (theme === "dark" || resolvedTheme === "dark")
                          ? "/images/blog/signatureShort_light.png"
                          : "/images/blog/signatureShort.png"
                    }
                    alt={"Digital Signature"}
                    width={`200`}
                    height={`100`}
                    placeholder="blur"
                    blurDataURL={
                      (theme === "dark" || resolvedTheme === "dark")
                          ? "/images/blog/signatureShort_light.png"
                          : "/images/blog/signatureShort.png"
                    }
                />
              </div>
              <ul className="post-meta-tag list-unstyled list-inline mt-5">
                <li className="list-inline-item">Tags: </li>
                {tags.map((t, i) => (
                  <li key={i} className="list-inline-item">
                    <Link
                      href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}
                      className="bg-white text-dark"
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {useScripts("/js/lightense/lightense.min.js", "body", true)}
    </Layout>
  );
}

export async function getStaticPaths() {
  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const blogs = blogDirFiles.filter((f) => f.includes(".md"));

  const paths = blogs.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileContents = fs.readFileSync(
    path.join("content/blog", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      slug,
      frontMatter,
      content,
      authors: getAuthors(),
    },
  };
}
