import Image from "next/image";
import Link from "next/link";
import {IconBell} from "@tabler/icons-react";

export default function ComingSoon({book: {frontMatter}}) {
  return (
      <article className="card post-card h-100 border-0 bg-transparent mt-lg-5">
        <div className="row mt-5 px-3">
          <div className="col-lg-4 d-flex justify-content-center">
              <div className="post-image position-relative w-75">
                <Image
                    className="rounded img-fluid"
                    src={frontMatter.image}
                    alt={frontMatter.alt}
                    width={`300`}
                    height={`500`}
                    placeholder="blur"
                    blurDataURL={frontMatter.image}
                />
              </div>
          </div>
          <div className="col-lg-8">
            <div className="ps-0 ps-lg-4 ms-0 ms-lg-3 mt-0 mt-lg-4">
              <div className="mx-2 card-body">
                <h2 className="section-title mb-4">
                  <span className="p-0">{frontMatter.title}</span>
                </h2>
                <p>
                  {frontMatter.description}
                </p>
                <Link
                    href="#footer"
                    scroll={true}
                    className="btn btn-primary mt-4"
                    aria-label="Get notified"
                >
                  <i className="me-2">
                    <IconBell size={16} />
                  </i>
                  Get notified
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

  )
}