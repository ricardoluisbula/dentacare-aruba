/** Renders a schema.org object as an inline JSON-LD <script> tag. Server-only, no client JS. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
