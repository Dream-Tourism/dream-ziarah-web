import NotFound from "@/components/common/NotFound";

export const metadata = {
  title: "404 || Dream Ziarah - Travel & Tour React NextJS Template",
  description: "Dream Ziarah - Travel & Tour React NextJS Template",
};

export default function Page404() {
  return (
    <>
      <div className="header-margin"></div>

      <NotFound />
      {/* End 404 section */}
    </>
  );
}
