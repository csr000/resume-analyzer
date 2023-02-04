import ContentLoader from "react-content-loader";

export const RectLoader = (props) => {
  return (
    <ContentLoader speed={2} width={400} height={160} viewBox="0 0 400 160" backgroundColor="#d9d9d9" foregroundColor="#ededed" {...props}>
      <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
    </ContentLoader>
  );
};
 