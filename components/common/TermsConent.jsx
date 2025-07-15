"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const TermsConent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("type") === "general_terms_of_use") {
      setTabIndex(0);
    }
    if (searchParams.get("type") === "privacy_policy") {
      setTabIndex(1);
    }

    localStorage.clear();
  }, []);

  useEffect(() => {
    if (tabIndex === 0) {
      router.push("/terms?type=general_terms_of_use");
    }
    if (tabIndex === 1) {
      router.push("/terms?type=privacy_policy");
    }
  }, [tabIndex]);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <div className="row y-gap-30">
        <div className="col-lg-3">
          <div className="px-30 py-30 rounded-4 border-light">
            <TabList className="tabs__controls row y-gap-10 js-tabs-controls">
              <Tab className="col-12 tabs__button js-tabs-button">
                General Terms of Use
              </Tab>
              <Tab className="col-12 tabs__button js-tabs-button">
                Privacy policy
              </Tab>
              {/* <Tab className="col-12 tabs__button js-tabs-button">
                Cookie Policy
              </Tab>
              <Tab className="col-12 tabs__button js-tabs-button">
                Best Price Guarantee
              </Tab> */}
            </TabList>
          </div>
        </div>
        {/* End .col-lg-3 */}

        <div className="col-lg-9">
          <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15">
                Terms and Conditions of Use
              </h1>
              <h2 className="text-16 fw-600">1. Terms</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                By accessing this Website, accessible from{" "}
                <a
                  className="text-primary"
                  href="https://dreamziarah.com"
                  target="_blank"
                >
                  https://dreamziarah.com/
                </a>
                , you are agreeing to be bound by these Website Terms and
                Conditions of Use and agree that you are responsible for the
                agreement with any applicable local laws. If you disagree with
                any of these terms, you are prohibited from accessing this site.
                The materials contained in this Website are protected by
                copyright and trade mark law.
              </p>
              <h2 className="text-16 fw-600 mt-35">2. Use License</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                Permission is granted to temporarily download one copy of the
                materials on Dream Tourism's Website for personal,
                non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="mt-5 pl-80 mt-5 pl-80 listStyle">
                <li>modify or copy the materials;</li>
                <li>
                  use the materials for any commercial purpose or for any public
                  display;
                </li>
                <li>
                  {" "}
                  attempt to reverse engineer any software contained on Dream
                  Tourism's Website;
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials; or
                </li>
                <li>
                  transferring the materials to another person or "mirror" the
                  materials on any other server.
                </li>
              </ul>
              <p className="text-15 text-justify text-dark-1 mt-5">
                This will let Dream Tourism to terminate upon violations of any
                of these restrictions. Upon termination, your viewing right will
                also be terminated and you should destroy any downloaded
                materials in your possession whether it is printed or electronic
                format. These Terms of Service has been created with the help of
                the Terms Of Service Generator.
              </p>
              <h2 className="text-16 fw-600 mt-35">3. Disclaimer</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                All the materials on Dream Tourism's Website are provided "as
                is". Dream Tourism makes no warranties, may it be expressed or
                implied, therefore negates all other warranties. Furthermore,
                Dream Tourism does not make any representations concerning the
                accuracy or reliability of the use of the materials on its
                Website or otherwise relating to such materials or any sites
                linked to this Website.
              </p>
              <h2 className="text-16 fw-600 mt-35">4. Limitations</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                Dream Tourism or its suppliers will not be held accountable for
                any damages that will arise with the use or inability to use the
                materials on Dream Tourism's Website, even if Dream Tourism or
                an authorized representative of this Website has been notified,
                orally or written, of the possibility of such damage. Some
                jurisdiction does not allow limitations on implied warranties or
                limitations of liability for incidental damages, these
                limitations may not apply to you.
              </p>
              <h2 className="text-16 fw-600 mt-35">5. Revisions and Errata</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                The materials appearing on Dream Tourism's Website may include
                technical, typographical, or photographic errors.{" "}
                <a href="#">Dream Tourism</a> will not promise that any of the
                materials in this Website are accurate, complete, or current.
                Dream Tourism may change the materials contained on its Website
                at any time without notice. Dream Tourism does not make any
                commitment to update the materials.
              </p>
              <h2 className="text-16 fw-600 mt-35">6. Links</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                Dream Tourism has not reviewed all of the sites linked to its
                Website and is not responsible for the contents of any such
                linked site. The presence of any link does not imply endorsement
                by Dream Tourism of the site. The use of any linked website is
                at the user's own risk.
              </p>
              <h2 className="text-16 fw-600 mt-35">
                7. Site Terms of Use Modifications
              </h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                Dream Tourism may revise these Terms of Use for its Website at
                any time without prior notice. By using this Website, you are
                agreeing to be bound by the current version of these Terms and
                Conditions of Use.
              </p>
              <h2 className="text-16 fw-600 mt-35">8. Your Privacy</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                Please read our{" "}
                <span
                  onClick={() => setTabIndex(1)}
                  className="cursor-pointer text-primary"
                >
                  Privacy Policy
                </span>
                .
              </p>
              <h2 className="text-16 fw-600 mt-35">9. Governing Law</h2>
              <p className="text-15 text-justify text-dark-1 mt-5">
                Any claim related to Dream Tourism's Website shall be governed
                by the laws of it without regards to its conflict of law
                provisions.
              </p>
            </div>
          </TabPanel>
          {/* End  General Terms of Use */}

          <TabPanel>
            <div
              className="tabs__content js-tabs-content text-15 text-dark-1"
              data-aos="fade"
            >
              <h1 className="text-30 fw-600 mb-15"> PRIVACY POLICY</h1>
              <div className="mb-20">
                <div>
                  <p className="text-15 text-dark-1 mt-5">
                    This privacy notice for Dream Ziarah ('we', 'us', or 'our'),
                    describes how and why we might collect,store, use, and/or
                    share ('process') your information when you use our services
                    ('Services'), such as when you:{" "}
                  </p>
                  <ul className="mt-5 pl-80 mt-5 pl-80 listStyle">
                    <li>
                      Visit our website at{" "}
                      <a
                        className="text-primary"
                        href="https://dreamziarah.com"
                      >
                        https://dreamziarah.com/
                      </a>
                      , or any website of ours that links to this privacy notice
                    </li>
                    <li>
                      Engage with us in other related ways, including any sales,
                      marketing, or events
                    </li>
                  </ul>
                  <p className="text-15 text-dark-1 mt-5">
                    Questions or concerns? Reading this privacy notice will help
                    you understand your privacy rights and choices. If you do
                    not agree with our policies and practices, please do not use
                    our Services.
                  </p>
                </div>
              </div>
              <div className="mb-20">
                <h4 className="text-30 fw-600 mb-15">SUMMARY OF KEY POINTS</h4>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  This summary provides key points from our privacy notice, but
                  you can find out more details about any of these topics by
                  clicking the link following each key point or by using our
                  table of contents below to find the section you are looking
                  for.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  What personal information do we process? When you visit, use,
                  or navigate our Services, we may process personal information
                  depending on how you interact with us and the Services, the
                  choices you make, and the products and features you use.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  Do we process any sensitive personal information? We do not
                  process sensitive personal information.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  Do we receive any information from third parties? We do not
                  receive any information from third parties.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  How do we process your information? We process your
                  information to provide, improve, and administer our Services,
                  communicate with you, for security and fraud prevention, and
                  to comply with law. We may also process your information for
                  other purposes with your consent. We process your information
                  only when we have a valid legal reason to do so.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  In what situations and with which parties do we share personal
                  information? We may share information in specific situations
                  and with specific third parties.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  How do we keep your information safe? We have organizational
                  and technical processes and procedures in place to protect
                  your personal information. However, no electronic transmission
                  over the internet or information storage technology can be
                  guaranteed to be 100% secure, so we cannot promise or
                  guarantee that hackers, cybercriminals, or other unauthorized
                  third parties will not be able to defeat our security and
                  improperly collect, access, steal, or modify your information.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  What are your rights? Depending on where you are located
                  geographically, the applicable privacy law may mean you have
                  certain rights regarding your personal information.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  How do you exercise your rights? The easiest way to exercise
                  your rights is by submitting a data subject access request, or
                  by contacting us. We will consider and act upon any request in
                  accordance with applicable data protection laws.
                </p>
                <p className="text-15 text-dark-1 mt-5 text-justify">
                  Want to learn more about what we do with any information we
                  collect?
                </p>
              </div>
              <div className="mb-20">
                <h4 className="mb-20">TABLE OF CONTENTS</h4>
                <ol className="text-primary">
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer1">
                      WHAT INFORMATION DO WE COLLECT?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer2">
                      HOW DO WE PROCESS YOUR INFORMATION?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer3">
                      {" "}
                      WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
                      INFORMATION?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer4">
                      WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer5">
                      {" "}
                      DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer6">
                      HOW LONG DO WE KEEP YOUR INFORMATION?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer7">
                      {" "}
                      HOW DO WE KEEP YOUR INFORMATION SAFE?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer8">
                      {" "}
                      DO WE COLLECT INFORMATION FROM MINORS?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer9">
                      WHAT ARE YOUR PRIVACY RIGHTS?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer10">
                      CONTROLS FOR DO-NOT-TRACK FEATURES
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer11">
                      DO WE MAKE UPDATES TO THIS NOTICE?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer12">
                      HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                    </AnchorLink>
                  </li>
                  <li className="questionItem">
                    <AnchorLink className="text-primary" href="#answer13">
                      {" "}
                      HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                      FROM YOU?
                    </AnchorLink>
                  </li>
                </ol>
              </div>
              <section id="answer1" className="answerContainer">
                <h4 className="mb-20">1. WHAT INFORMATION DO WE COLLECT?</h4>
                <h6 className="mb-20">
                  Personal information you disclose to us
                </h6>
                <div>
                  <i>
                    In Short: We collect personal information that you provide
                    to us.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20">
                    We collect personal information that you voluntarily provide
                    to us when you express an interest in obtaining information
                    about us or our products and Services, when you participate
                    in activities on the Services, or otherwise when you contact
                    us.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    Personal Information Provided by You. The personal
                    information that we collect depends on the context of your
                    interactions with us and the Services, the choices you make,
                    and the products and features you use. The personal
                    information we collect may include the following:
                  </p>
                  <ul className="mt-5 pl-80 mt-5 pl-80 listStyle">
                    <li>names</li>
                    <li>phone numbers</li>
                    <li>email addresses</li>
                    <li>contact preferences</li>
                  </ul>

                  <p className="text-15 text-dark-1 text-justify pt-20">
                    Sensitive Information. We do not process sensitive
                    information.
                  </p>
                  <p className="text-15 text-dark-1 text-justify pt-20">
                    Payment Data. We may collect data necessary to process your
                    payment if you make purchases, such as your payment
                    instrument number, and the security code associated with
                    your payment instrument.
                  </p>
                  <p className="text-15 text-dark-1 text-justify pt-20">
                    All personal information that you provide to us must be
                    true, complete, and accurate, and you must notify us of any
                    changes to such personal information.
                  </p>
                  <h6 className="mb-20">Information automatically collected</h6>
                  <i className="text-15 text-dark-1 text-justify">
                    In Short: Some information — such as your Internet Protocol
                    (IP) address and/or browser and device characteristics — is
                    collected automatically when you visit our Services.
                  </i>
                  <p className="text-15 text-dark-1 text-justify pt-20">
                    We automatically collect certain information when you visit,
                    use, or navigate the Services. This information does not
                    reveal your specific identity (like your name or contact
                    information) but may include device and usage information,
                    such as your IP address, browser and device characteristics,
                    operating system, language preferences, referring URLs,
                    device name, country, location, information about how and
                    when you use our Services, and other technical information.
                    This information is primarily needed to maintain the
                    security and operation of our Services, and for our internal
                    analytics and reporting purposes.
                  </p>
                  <p className="text-15 text-dark-1 text-justify pt-20">
                    Like many businesses, we also collect information through
                    cookies and similar technologies.
                  </p>
                  <p className="text-15 text-dark-1 text-justify pt-20">
                    The information we collect includes:
                  </p>
                  <ul className="mt-5 pl-80 mt-5 pl-80 listStyle">
                    <li>
                      <p className="text-15 text-dark-1 text-justify">
                        Log and Usage Data. Log and usage data is
                        service-related, diagnostic, usage, and performance
                        information our servers automatically collect when you
                        access or use our Services and which we record in log
                        files. Depending on how you interact with us, this log
                        data may include your IP address, device information,
                        browser type, and settings and information about your
                        activity in the Services (such as the date/time stamps
                        associated with your usage, pages and files viewed,
                        searches, and other actions you take such as which
                        features you use), device event information (such as
                        system activity, error reports (sometimes called 'crash
                        dumps'), and hardware settings).
                      </p>
                    </li>
                    <li>
                      <p className="text-15 text-dark-1 text-justify">
                        Device Data. We collect device data such as information
                        about your computer, phone, tablet, or other device you
                        use to access the Services. Depending on the device
                        used, this device data may include information such as
                        your IP address (or proxy server), device and
                        application identification numbers, location, browser
                        type, hardware model, Internet service provider and/or
                        mobile carrier, operating system, and system
                        configuration information.
                      </p>
                    </li>
                    <li>
                      <p className="text-15 text-dark-1 text-justify">
                        Location Data. We collect location data such as
                        information about your device's location, which can be
                        either precise or imprecise. How much information we
                        collect depends on the type and settings of the device
                        you use to access the Services. For example, we may use
                        GPS and other technologies to collect geolocation data
                        that tells us your current location (based on your IP
                        address). You can opt out of allowing us to collect this
                        information either by refusing access to the information
                        or by disabling your Location setting on your device.
                        However, if you choose to opt out, you may not be able
                        to use certain aspects of the Services.
                      </p>
                    </li>
                  </ul>
                </div>
              </section>
              <section id="answer2" className="answerContainer">
                <h4 className="mb-20">
                  2. HOW DO WE PROCESS YOUR INFORMATION?
                </h4>
                <div>
                  <i>
                    In Short: We process your information to provide, improve,
                    and administer our Services, communicate with you, for
                    security and fraud prevention, and to comply with law. We
                    may also process your information for other purposes with
                    your consent.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We process your personal information for a variety of
                    reasons, depending on how you interact with our Services,
                    including:
                  </p>
                  <ul className="mt-5 pl-80 listStyle">
                    <li>
                      To save or protect an individual's vital interest. We may
                      process your information when necessary to save or protect
                      an individual’s vital interest, such as to prevent harm.
                    </li>
                  </ul>
                </div>
              </section>
              <section id="answer3" className="answerContainer">
                <h4 className="mb-20">
                  3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
                </h4>
                <div>
                  <i>
                    In Short: We only process your personal information when we
                    believe it is necessary and we have a valid legal reason
                    (i.e. legal basis) to do so under applicable law, like with
                    your consent, to comply with laws, to provide you with
                    services to enter into or fulfill our contractual
                    obligations, to protect your rights, or to fulfill our
                    legitimate business interests.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    The General Data Protection Regulation (GDPR) and UK GDPR
                    require us to explain the valid legal bases we rely on in
                    order to process your personal information. As such, we may
                    rely on the following legal bases to process your personal
                    information:
                  </p>
                  <ul className="mt-5 pl-80 listStyle">
                    <li>
                      Consent. We may process your information if you have given
                      us permission (i.e. consent) to use your personal
                      information for a specific purpose. You can withdraw your
                      consent at any time. Learn more about withdrawing your
                      consent.
                    </li>
                    <li>
                      Legal Obligations. We may process your information where
                      we believe it is necessary for compliance with our legal
                      obligations, such as to cooperate with a law enforcement
                      body or regulatory agency, exercise or defend our legal
                      rights, or disclose your information as evidence in
                      litigation in which we are involved.
                    </li>
                    <li>
                      Vital Interests. We may process your information where we
                      believe it is necessary to protect your vital interests or
                      the vital interests of a third party, such as situations
                      involving potential threats to the safety of any person.
                    </li>
                  </ul>
                </div>
              </section>
              <section id="answer4" className="answerContainer">
                <h4 className="mb-20">
                  4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h4>
                <div>
                  <i>
                    In Short: We may share information in specific situations
                    described in this section and/or with the following third
                    parties.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We may need to share your personal information in the
                    following situations:
                  </p>
                  <ul className="mt-5 pl-80 listStyle">
                    <li>
                      Business Transfers. We may share or transfer your
                      information in connection with, or during negotiations of,
                      any merger, sale of company assets, financing, or
                      acquisition of all or a portion of our business to another
                      company.
                    </li>
                    <li>
                      Business Partners. We may share your information with our
                      business partners to offer you certain products, services,
                      or promotions.
                    </li>
                  </ul>
                </div>
              </section>
              <section id="answer5" className="answerContainer">
                <h4 className="mb-20">
                  5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </h4>
                <div>
                  <i>
                    In Short: We may use cookies and other tracking technologies
                    to collect and store your information.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We may use cookies and similar tracking technologies (like
                    web beacons and pixels) to access or store information.
                    Specific information about how we use such technologies and
                    how you can refuse certain cookies is set out in our Cookie
                    Notice.
                  </p>
                </div>
              </section>
              <section id="answer6" className="answerContainer">
                <h4 className="mb-20">
                  6. HOW LONG DO WE KEEP YOUR INFORMATION?
                </h4>
                <div>
                  <i>
                    In Short: We keep your information for as long as necessary
                    to fulfill the purposes outlined in this privacy notice
                    unless otherwise required by law.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this privacy
                    notice, unless a longer retention period is required or
                    permitted by law (such as tax, accounting, or other legal
                    requirements).
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete or
                    anonymise such information, or, if this is not possible (for
                    example, because your personal information has been stored
                    in backup archives), then we will securely store your
                    personal information and isolate it from any further
                    processing until deletion is possible.
                  </p>
                </div>
              </section>
              <section id="answer7" className="answerContainer">
                <h4 className="mb-20">
                  7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                </h4>
                <div>
                  <i>
                    In Short: We aim to protect your personal information
                    through a system of organizational and technical security
                    measures.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We have implemented appropriate and reasonable technical and
                    organizational security measures designed to protect the
                    security of any personal information we process. However,
                    despite our safeguards and efforts to secure your
                    information, no electronic transmission over the Internet or
                    information storage technology can be guaranteed to be 100%
                    secure, so we cannot promise or guarantee that hackers,
                    cybercriminals, or other unauthorized third parties will not
                    be able to defeat our security and improperly collect,
                    access, steal, or modify your information. Although we will
                    do our best to protect your personal information,
                    transmission of personal information to and from our
                    Services is at your own risk. You should only access the
                    Services within a secure environment.
                  </p>
                </div>
              </section>
              <section id="answer8" className="answerContainer">
                <h4 className="mb-20">
                  8. DO WE COLLECT INFORMATION FROM MINORS?
                </h4>
                <div>
                  <i>
                    In Short: We do not knowingly collect data from or market to
                    children under 18 years of age.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We do not knowingly solicit data from or market to children
                    under 18 years of age. By using the Services, you represent
                    that you are at least 18 or that you are the parent or
                    guardian of such a minor and consent to such minor
                    dependent’s use of the Services. If we learn that personal
                    information from users less than 18 years of age has been
                    collected, we will deactivate the account and take
                    reasonable measures to promptly delete such data from our
                    records.
                  </p>
                </div>
              </section>
              <section id="answer9" className="answerContainer">
                <h4 className="mb-20">9. WHAT ARE YOUR PRIVACY RIGHTS?</h4>
                <div>
                  <i>
                    In Short: In some regions, such as the European Economic
                    Area (EEA), United Kingdom (UK), and Switzerland, you have
                    rights that allow you greater access to and control over
                    your personal information. You may review, change, or
                    terminate your account at any time.
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    In some regions (like the EEA, UK, and Switzerland), you
                    have certain rights under applicable data protection laws.
                    These may include the right (i) to request access and obtain
                    a copy of your personal information, (ii) to request
                    rectification or erasure; (iii) to restrict the processing
                    of your personal information; (iv) if applicable, to data
                    portability; and (v) not to be subject to automated
                    decision-making. In certain circumstances, you may also have
                    the right to object to the processing of your personal
                    information. You can make such a request by contacting us by
                    using the contact details provided in the section 'HOW CAN
                    YOU CONTACT US ABOUT THIS NOTICE?' below.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    We will consider and act upon any request in accordance with
                    applicable data protection laws.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    If you are located in the EEA or UK and you believe we are
                    unlawfully processing your personal information, you also
                    have the right to complain to your Member State data
                    protection authority or UK data protection authority.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    If you are located in Switzerland, you may contact the
                    Federal Data Protection and Information Commissioner.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    <u>Withdrawing your consent:</u> If we are relying on your
                    consent to process your personal information, you have the
                    right to withdraw your consent at any time. You can withdraw
                    your consent at any time by contacting us by using the
                    contact details provided in the section 'HOW CAN YOU CONTACT
                    US ABOUT THIS NOTICE?' below.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    However, please note that this will not affect the
                    lawfulness of the processing before its withdrawal nor will
                    it affect the processing of your personal information
                    conducted in reliance on lawful processing grounds other
                    than consent.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    <u>
                      Opting out of marketing and promotional communications:
                    </u>{" "}
                    You can unsubscribe from our marketing and promotional
                    communications at any time by clicking on the unsubscribe
                    link in the emails that we send, or by contacting us using
                    the details provided in the section 'HOW CAN YOU CONTACT US
                    ABOUT THIS NOTICE?' below. You will then be removed from the
                    marketing lists. However, we may still communicate with you
                    — for example, to send you service-related messages that are
                    necessary for the administration and use of your account, to
                    respond to service requests, or for other non-marketing
                    purposes.
                  </p>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    <u>Cookies and similar technologies:</u> Most Web browsers
                    are set to accept cookies by default. If you prefer, you can
                    usually choose to set your browser to remove cookies and to
                    reject cookies. If you choose to remove cookies or reject
                    cookies, this could affect certain features or services of
                    our Services.
                  </p>
                </div>
              </section>
              <section id="answer10" className="answerContainer">
                <h4 className="mb-20">
                  10. CONTROLS FOR DO-NOT-TRACK FEATURES
                </h4>
                <div>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    Most web browsers and some mobile operating systems and
                    mobile applications include a Do-Not-Track ('DNT') feature
                    or setting you can activate to signal your privacy
                    preference not to have data about your online browsing
                    activities monitored and collected. At this stage no uniform
                    technology standard for recognising and implementing DNT
                    signals has been finalized. As such, we do not currently
                    respond to DNT browser signals or any other mechanism that
                    automatically communicates your choice not to be tracked
                    online. If a standard for online tracking is adopted that we
                    must follow in the future, we will inform you about that
                    practice in a revised version of this privacy notice.
                  </p>
                </div>
              </section>
              <section id="answer11" className="answerContainer">
                <h4 className="mb-20">
                  11. DO WE MAKE UPDATES TO THIS NOTICE?
                </h4>
                <div>
                  <i>
                    In Short: Yes, we will update this notice as necessary to
                    stay compliant with relevant laws
                  </i>
                  <p className="text-15 text-dark-1 text-justify mb-20 pt20">
                    We may update this privacy notice from time to time. The
                    updated version will be indicated by an updated 'Revised'
                    date and the updated version will be effective as soon as it
                    is accessible. If we make material changes to this privacy
                    notice, we may notify you either by prominently posting a
                    notice of such changes or by directly sending you a
                    notification. We encourage you to review this privacy notice
                    frequently to be informed of how we are protecting your
                    information.
                  </p>
                </div>
              </section>
              <section id="answer12" className="answerContainer">
                <h4 className="mb-20">
                  12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </h4>
                <div>
                  <p className="text-15 text-dark-1 mt-5 text-justify">
                    If you have questions or comments about this notice, you may
                    contact us by post at:
                  </p>
                  <div className="row">
                    <div className="col-md-3">
                      <h6 className="pb-10">Dream Ziarah</h6>
                      <h6>Address: </h6>
                      <span>
                        3893 Ibrahim Al Khalil, Ash Shubaikah 6428, Mecca 24231,
                        Saudi Arabia.
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              <section id="answer13" className="answerContainer">
                <h4 className="mb-20">
                  13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </h4>
                <div>
                  <p className="text-15 text-dark-1 text-justify">
                    You have the right to request access to the personal
                    information we collect from you, change that information, or
                    delete it. To request to review, update, or delete your
                    personal information, please fill out and submit a data
                    subject access request.
                  </p>
                </div>
              </section>
            </div>
          </TabPanel>
          {/* End  Privacy policy */}

          {/* <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15"> Cookie Policy</h1>
              <h2 className="text-16 fw-600">1. Your Agreement</h2>
              <p className="text-15 text-dark-1 mt-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br />
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <h2 className="text-16 fw-600 mt-35">
                2. Change of Terms of Use
              </h2>
              <p className="text-15 text-dark-1 mt-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br />
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <h2 className="text-16 fw-600 mt-35">
                3. Access and Use of the Services
              </h2>
              <p className="text-15 text-dark-1 mt-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br />
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
            </div>
          </TabPanel> */}
          {/* End  Cookie Policy */}

          {/* <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15"> Best Price Guarantee</h1>
              <h2 className="text-16 fw-600">1. Your Agreement</h2>
              <p className="text-15 text-dark-1 mt-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br />
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <h2 className="text-16 fw-600 mt-35">
                2. Change of Terms of Use
              </h2>
              <p className="text-15 text-dark-1 mt-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br />
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <h2 className="text-16 fw-600 mt-35">
                3. Access and Use of the Services
              </h2>
              <p className="text-15 text-dark-1 mt-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br />
                <br />
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
            </div>
          </TabPanel> */}
          {/* End  Best Price Guarantee */}
        </div>
        {/* End col-lg-9 */}
      </div>
    </Tabs>
  );
};

export default TermsConent;
