import PrivacyPolicyContent from "@/components/common/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy | Dream Ziarah's Commitment to Your Privacy",
  description:
    "Read Dream Ziarah's privacy policy to understand how we handle and protect your information. Your privacy is important to us, and we prioritize keeping your data secure.",
};

const PrivacyPolicy = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-10 col-lg-11">
              <div className="px-30 py-30 rounded-4 border-light">
                <PrivacyPolicyContent />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End privacy policy section */}
    </>
  );
};

export default PrivacyPolicy;