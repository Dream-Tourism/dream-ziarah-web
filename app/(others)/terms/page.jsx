import TermsConent from "@/components/common/TermsConent";

const metaDatas = {
  general_terms_of_use: {
    title: "Terms and Conditions | Dream Ziarah's Booking Guidelines",
    description:
      "Review Dream Ziarah's Privacy Policy to understand how we protect your information. Our commitment to your privacy is paramount as you plan your spiritual journey with us.",
  },
  privacy_policy: {
    title: "Privacy Policy | Dream Ziarah's Commitment to Your Privacy",
    description:
      "Read Dream Ziarah's privacy policy to understand how we handle and protect your information. Your privacy is important to us, and we prioritize keeping your data secure.",
  },
};

export async function generateMetadata({ params, searchParams }, parent) {
  const { type } = searchParams;

  return {
    title: metaDatas[type]?.title,
    description: metaDatas[type]?.description,
  };
}

const Terms = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      {/* <DefaultHeader /> */}
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <TermsConent />
          </div>
        </div>
      </section>
      {/* End terms section */}
    </>
  );
};

// export default dynamic(() => Promise.resolve(Terms), { ssr: false });
export default Terms;
