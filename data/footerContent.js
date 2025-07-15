module.exports = [
  // {
  //   id: 1,
  //   title: "Company",
  //   menuList: [
  //     { name: "About Us", routerPath: "/about" },
  //     // { name: "Careers", routerPath: "/" },
  //     // { name: "Blog", routerPath: "/blog" },
  //     // { name: "Press", routerPath: "/" },
  //     // { name: "Gift Cards", routerPath: "/" },
  //   ],
  // },
  {
    id: 2,
    title: "Navigation",
    menuList: [
      { name: "About Us", routerPath: "/about" },
      { name: "Contact", routerPath: "/contact" },
      // { name: "Legal Notice", routerPath: "/" },
      { name: "Privacy Policy", routerPath: "/terms?type=privacy_policy" },
      {
        name: "Terms and Conditions",
        routerPath: "/terms?type=general_terms_of_use",
      },
    ],
  },
];
