import ContentLoader from "react-content-loader";

export const RectLoader = (props) => {
  return (
    <ContentLoader className="mob:w-full h-full" speed={2}  viewBox="0 0 400 160" backgroundColor="#d9d9d9" foregroundColor="#ededed" {...props}>
      <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
    </ContentLoader>
  );
};

export const AnalysisSectionLoader = (props) => {
  return (
    <>
      <ContentLoader className="mob:w-full h-full"   viewBox="0 0 400 200" backgroundColor="#d9d9d9" foregroundColor="#ecebeb">
        <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
        <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
        <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
        <rect x="15" y="50" rx="3" ry="3" width="90" height="10" />
        <rect x="115" y="50" rx="3" ry="3" width="60" height="10" />
        <rect x="185" y="50" rx="3" ry="3" width="200" height="10" />
        <rect x="15" y="90" rx="3" ry="3" width="130" height="10" />
        <rect x="160" y="90" rx="3" ry="3" width="120" height="10" />
        <rect x="290" y="90" rx="3" ry="3" width="95" height="10" />
        <rect x="15" y="130" rx="3" ry="3" width="130" height="10" />
        <rect x="160" y="130" rx="3" ry="3" width="60" height="10" />
        <rect x="235" y="130" rx="3" ry="3" width="150" height="10" />
        <rect x="15" y="170" rx="3" ry="3" width="130" height="10" />
        <rect x="160" y="170" rx="3" ry="3" width="225" height="10" />
      </ContentLoader>
      <ContentLoader className="mob:w-full" viewBox="0 0 400 200" backgroundColor="#d9d9d9" foregroundColor="#ecebeb">
      <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
      <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
      <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
      <rect x="15" y="50" rx="3" ry="3" width="90" height="10" />
      <rect x="115" y="50" rx="3" ry="3" width="60" height="10" />
      <rect x="185" y="50" rx="3" ry="3" width="200" height="10" />
      <rect x="15" y="90" rx="3" ry="3" width="130" height="10" />
      <rect x="160" y="90" rx="3" ry="3" width="120" height="10" />
      <rect x="290" y="90" rx="3" ry="3" width="95" height="10" />
      <rect x="15" y="130" rx="3" ry="3" width="130" height="10" />
      <rect x="160" y="130" rx="3" ry="3" width="60" height="10" />
      <rect x="235" y="130" rx="3" ry="3" width="150" height="10" />
      <rect x="15" y="170" rx="3" ry="3" width="130" height="10" />
      <rect x="160" y="170" rx="3" ry="3" width="225" height="10" />
    </ContentLoader>
    </>
  );
};
