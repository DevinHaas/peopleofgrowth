export default function Quote({quote: {frontMatter}}) {
  return (

      <div className="card quote-card  mb-lg-5">
        <div className="row">
          <div
              className="text-center quote-text rounded text-center p-3">
            <h2>
              „{frontMatter.quote}“
            </h2>
            <p className="text-primary">
              {frontMatter.writer}
            </p>
          </div>
        </div>
      </div>
  );
}