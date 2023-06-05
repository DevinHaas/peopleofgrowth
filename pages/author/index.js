import Author from "@/components/Author";
import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Post from "@/components/Post";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { IconNewSection } from "@tabler/icons-react";
import Link from "next/link";

export default function Authors({ authors, posts }) {
  const allAuthor = posts.map((author) => author.frontMatter.author);
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  const postColumns = siteConfig.postColumns;

  return (
    <Layout metaTitle="Our Authors">
      <PageHeaderBlock title="Author" />

      <section className="section-sm pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row gx-4 gy-5 gx-md-5 justify-content-center text-center">
                {authors.map((author, i) => (
                  <div key={i} className="col-lg-4 col-sm-6">
                    <Author author={author} postCount={postCount} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      authors: getAuthors(),
      posts: getPosts(),
    },
  };
}
