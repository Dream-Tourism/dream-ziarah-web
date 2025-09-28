import NotFound from "@/components/common/NotFound";

export const metadata = {
  title: "404 || DreamZiarah - Hajj, Umrah And Ziarah",
  description: "DreamZiarah - Hajj, Umrah And Ziarah",
};

export default function NotFoundPage() {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End Header 1 */}

      <NotFound />
      {/* End 404 section */}
    </>
  );
}
