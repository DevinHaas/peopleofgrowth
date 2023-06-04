import Image from "next/image";
import Link from "next/link";

export default function Author({
  author: {
    authorSlug,
    authorFrontMatter: { title, image },
  }
}) {
  return (
    <>
      <Link
        href={`/author/${authorSlug}`}
        className="d-inline-block is-hoverable"
      >
        <Image
          className="rounded img-fluid"
          src={image}
          alt={title}
          width={`150`}
          height={`150`}
          placeholder="blur"
          blurDataURL={image}
        />
        <h4 className="text-dark mt-4 mb-1">{title}</h4>
      </Link>
    </>
  );
}
