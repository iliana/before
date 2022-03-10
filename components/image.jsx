import NextImage from "next/image";

export default function Image(props) {
  return <NextImage placeholder="blur" loader={({ src }) => src} unoptimized {...props} />;
}
