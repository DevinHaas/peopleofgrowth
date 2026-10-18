import Image from "next/image";
import Link from "next/link";

export default function HumanWritten() {
  return (
      <div className="row justify-content-center my-5 py-5">
        <div className="col-lg-8 text-center">
          <Image
              src="/images/written-by-me.png"
              alt="Handwritten note: Written by me without AI"
              width={2340}
              height={915}
              className="img-fluid"
              style={{maxWidth: 520, height: "auto"}}
          />
          <p className="mt-3 mb-1">Every summary on this site is written by hand.</p>
          <small className="d-block" style={{fontSize: 12, color: "#86868b"}}>
            Want proof?{" "}
            <Link href="/proof" style={{color: "inherit", textDecoration: "underline"}}>
              See how my texts compare to AI
            </Link>.
          </small>
        </div>
      </div>
  );
}
